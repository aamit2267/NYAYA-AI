"use client";
import { useHealthViewModel } from '@/app/viewmodels/useHealthViewModel';

export default function Footer() {
  const { status } = useHealthViewModel();

  return (
    <footer className="mt-auto py-6 border-t border-border bg-card px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-foreground/50 font-medium">© 2026 Nyaya-AI. Made for Indian Justice.</p>
        
        <div className="flex items-center gap-3 bg-background border border-border px-4 py-2 rounded-full shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground/70">Backend System:</span>
            {status === 'LOADING' && <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />}
            {status === 'UP' && (
              <div className="flex items-center gap-1 text-xs font-bold text-success">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse shadow-[0_0_10px_var(--color-success)]" />
                Online
              </div>
            )}
            {status === 'DOWN' && (
              <div className="flex items-center gap-1 text-xs font-bold text-destructive">
                <div className="w-3 h-3 rounded-full bg-destructive shadow-[0_0_10px_var(--color-destructive)]" />
                Offline
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}