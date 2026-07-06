import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
} from '../lib/firestore';
import type { QueryConstraint, DocumentData } from 'firebase/firestore';

/**
 * Fetch a single Firestore document by ID.
 */
export function useFirestoreDoc<T>(
  collectionName: string,
  id: string | undefined,
) {
  return useQuery<T | null>({
    queryKey: [collectionName, id],
    queryFn: () => (id ? getDocument<T>(collectionName, id) : Promise.resolve(null)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch a list of Firestore documents with query constraints.
 */
export function useFirestoreQuery<T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  enabled = true,
) {
  return useQuery<T[]>({
    queryKey: [collectionName, 'list', JSON.stringify(constraints)],
    queryFn: () => queryDocuments<T>(collectionName, ...constraints),
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Mutation to create a document.
 */
export function useCreateDocument(collectionName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DocumentData }) =>
      createDocument(collectionName, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
  });
}

/**
 * Mutation to update a document.
 */
export function useUpdateDocument(collectionName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DocumentData> }) =>
      updateDocument(collectionName, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
  });
}

/**
 * Mutation to delete a document.
 */
export function useDeleteDocument(collectionName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDocument(collectionName, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
  });
}
