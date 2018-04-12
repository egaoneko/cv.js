class Perf {
  public static timeStart(label: string): void {
    console.time(label);
  }

  public static timeEnd(label: string): void {
    console.timeEnd(label);
  }
}

export default Perf;
