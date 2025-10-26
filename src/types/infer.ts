export type ExtractValidatorType<F> = F extends (data: any) => data is infer T
  ? {
      // 🔹 แปลง key ที่ลงท้ายด้วย "?" ให้กลายเป็น optional key จริง ๆ
      [K in keyof T as K extends `${infer P}?` ? P : K]: K extends `${infer _}?`
        ? T[K] | undefined
        : T[K];
    }
  : never;
