'use client';

import { FC, useTransition } from 'react';
import { process } from '@/server-actions/action';

interface ButtonProps {}

export const Button: FC<ButtonProps> = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending ? (
        <button
          onClick={() => startTransition(() => process())}
          className="border-2 py-2 px-3 bg-slate-400 text-white rounded-lg w-[250px]"
          disabled={true}
        >
          処理中
        </button>
      ) : (
        <button
          onClick={() => startTransition(() => process())}
          className="border-2 py-2 px-3 bg-slate-800 text-white rounded-lg w-[250px]"
        >
          送信
        </button>
      )}
    </>
  );
};
