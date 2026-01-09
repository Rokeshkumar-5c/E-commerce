import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';

/**
 * Typed dispatch hook
 * Use this instead of useDispatch for better TypeScript support
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
