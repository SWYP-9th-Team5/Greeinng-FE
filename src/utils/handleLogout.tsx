import { useAuthStore } from '@/stores/useAuthStore';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useRouter } from 'next/navigation';

interface LogoutOptions {
  closeSidebar?: boolean;
}

export function useHandleLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const actionSidebarClose = useSidebarStore(
    (state) => state.actionSidebarClose,
  );

  const handleLogout = ({ closeSidebar = false }: LogoutOptions = {}) => {
    console.log('로그아웃');
    logout();
    localStorage.removeItem('token');
    if (closeSidebar) {
      actionSidebarClose();
    }
    router.push('/');
  };

  return handleLogout;
}
