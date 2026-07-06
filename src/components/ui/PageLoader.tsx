export function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 opacity-50">
        <img src="/logo.svg" alt="Loading" className="w-full h-full object-contain" />
      </div>
      <div className="w-32 h-px bg-white/5 overflow-hidden relative rounded-full">
        <div className="absolute inset-0 bg-white/20 w-1/2 rounded-full animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
}
