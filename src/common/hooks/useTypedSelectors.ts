import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@store';

/**
 * Хук с типизированными селектами
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
