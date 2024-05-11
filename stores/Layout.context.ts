import { createContext } from 'react';
import { ILayoutContextOptions } from '@/providers/layout/utils/interfaces/layout.interface';

const LayoutContext = createContext<null | ILayoutContextOptions>(null);
LayoutContext.displayName = 'LayoutContext';

export default LayoutContext;
