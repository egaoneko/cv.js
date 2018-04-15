// http://mrdoob.com/
class Cache<T> {
  public enabled: boolean = true;

  private files: Map<string, T> = new Map();

  public add(key: string, file: T): void {
    if (!this.enabled) return;
    this.files.set(key, file);
  }

  public get(key: string): T {
    return this.files.get(key);
  }

  public has(key: string): boolean {
    return this.files.has(key);
  }

  public remove(key: string): void {
    this.files.delete(key);
  }

  public clear() {
    this.files.clear();
  }
}

export default Cache;
