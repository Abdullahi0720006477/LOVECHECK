import React from 'react'

interface InputCardProps {
  name1: string
  name2: string
  setName1: (name: string) => void
  setName2: (name: string) => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}

export const InputCard: React.FC<InputCardProps> = ({
  name1,
  name2,
  setName1,
  setName2,
  onSubmit,
  loading,
  error,
}) => {
  const isButtonDisabled = !name1.trim() || !name2.trim() || loading

  return (
    <div className="surface-container rounded-xl p-8 shadow-2xl relative overflow-hidden group border border-outline-variant/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-secondary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative space-y-8">
        <div className="space-y-2">
          <label className="block font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase ml-1">Your Name</label>
          <div className="relative flex items-center group/input">
            <span className="material-symbols-outlined absolute left-0 text-primary-container/60 transition-colors group-focus-within/input:text-primary-container">
              person
            </span>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 pl-10 focus:ring-0 focus:border-primary-container transition-all placeholder:text-on-surface-variant/20 font-headline text-2xl italic tracking-tight uppercase"
              placeholder="THE LOVER"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-outline-variant/30"></div>
          <span className="text-primary-container text-xl animate-pulse">💗</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-outline-variant/30"></div>
        </div>

        <div className="space-y-2">
          <label className="block font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase ml-1">Your Partner's Name</label>
          <div className="relative flex items-center group/input">
            <span className="material-symbols-outlined absolute left-0 text-secondary-container/60 transition-colors group-focus-within/input:text-secondary-container">
              favorite
            </span>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 pl-10 focus:ring-0 focus:border-secondary-container transition-all placeholder:text-on-surface-variant/20 font-headline text-2xl italic tracking-tight uppercase"
              placeholder="THE BELOVED"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isButtonDisabled}
          className={`w-full py-6 mt-4 font-label font-bold uppercase tracking-[0.2em] rounded-xl relative overflow-hidden group shadow-[0_10px_40px_-10px_rgba(255,79,139,0.5)] active:scale-[0.98] transition-all
            ${isButtonDisabled ? 'bg-surface-variant text-on-surface-variant/40 cursor-not-allowed opacity-50' : 'bg-primary-container text-on-primary'}`}
        >
          {!isButtonDisabled && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-secondary-container to-primary-container translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700 ease-in-out"></div>
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? 'Calculating...' : 'Check Our Love ✨'}
          </span>
        </button>

        {!loading && (name1.trim() === "" || name2.trim() === "") && (
          <p className="text-center font-label text-[10px] tracking-widest text-[#ffb4ab] uppercase mt-4">
            enter both names to reveal your destiny
          </p>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 animate-shake relative z-10">
            <p className="text-[10px] font-label uppercase tracking-widest text-center">{error}</p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/20 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-primary-container text-4xl animate-spin">refresh</span>
              <p className="font-label text-[10px] tracking-widest text-primary-container uppercase">Analyzing Chemistry...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
