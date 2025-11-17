import { test } from '@playwright/test';

export function step(stepName?: string) {
  return function decorator<T extends (...args: any[]) => any>(
    target: T,
    context: ClassMethodDecoratorContext,
  ): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
    return async function replacementMethod(
      this: any,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
      const name = `${stepName || String(context.name)} (${this.constructor.name})`;
      return await test.step(name, async () => {
        return await target.apply(this, args);
      });
    };
  };
}
