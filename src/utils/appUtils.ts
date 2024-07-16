export class HttpUtils {
  static createQueryString = (name: string, value: string, secondary: boolean = false) => {
    const params = new URLSearchParams("");
    params.set(name, value);

    let prefix = secondary ? '&' : '?';
    return prefix + params.toString();
  }
}
