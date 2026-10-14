import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'jsdom', setupFiles: ['src/design-system/test/setup.ts'], include: ['src/design-system/**/*.test.tsx'], maxWorkers: 1, minWorkers: 1 } });
