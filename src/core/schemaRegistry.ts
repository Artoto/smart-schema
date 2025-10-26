export class SchemaRegistry {
  private static registry = new Map<string, (data: any) => boolean>();

  static register<T>(name: string, validator: (data: any) => data is T) {
    if (this.registry.has(name)) {
      throw new Error(`Schema ${name} already registered.`);
    }
    this.registry.set(name, validator);
  }

  static get<T>(name: string): ((data: any) => data is T) | undefined {
    return this.registry.get(name) as ((data: any) => data is T) | undefined;
  }

  static validate<T>(name: string, data: any): boolean {
    const validator = this.get<T>(name);
    if (!validator) throw new Error(`Schema ${name} not found.`);
    return validator(data);
  }

  static list(): string[] {
    return Array.from(this.registry.keys());
  }
}
