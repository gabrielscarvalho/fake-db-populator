export class Optional<T> {
  protected data: T = null;
  protected hasChecked: boolean = false;

  public constructor(value: T = null) {
    this.data = value;
  }

  public static fromNull<T>() {
    return new Optional<T>();
  }

  public static fromValue<T>(value: T) {
    return new Optional<T>(value);
  }

  public isPresent(): boolean {
    this.hasChecked = true;
    return !!this.data;
  }

  public get(): T {
    if (!this.hasChecked) {
      throw new Error(
        'It is required to check if value is present before getting it. Call isPresent() before.'
      );
    }
    return this.data;
  }

  /**
   * Skip the isPresent step - but will throw error if value is not present.
   * @return T
   */
  public getForced(): T {
    if (!this.isPresent()) {
      throw new Error('Optional forced get of non existent value');
    }
    return this.data;
  }
}
