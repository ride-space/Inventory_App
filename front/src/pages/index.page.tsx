import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { AppLayout } from 'src/layout';
import { selectCount } from 'src/reducks/CounterStore';
import { decrement, increment } from 'src/reducks/CounterStore/slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';


const Index: CustomNextPage = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const { data, status } = useSession();

  return (
    <div>
      {data?.user?.name || <Link href="/auth/signin"> GO TO SIGN</Link>}
      {status === 'authenticated' && (
        <button
          onClick={() => {
            return signOut();
          }}
        >
          SIGN OUT
        </button>
      )}
      <div>
        <Link href="/categories">PROTECTED PAGE</Link>
      </div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => {
            return dispatch(increment());
          }}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => {
            return dispatch(decrement());
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

Index.getLayout = AppLayout;
Index.requireAuth = true;

export default Index;
