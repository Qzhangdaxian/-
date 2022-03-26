export class CheckStatePipe  {
    transform(value: any): any {
      const data = [
        {
          name: '不通过',
          value: 1
        },
        {
          name: '通过',
          value: 2
        }
      ];
    const returnData = data.filter((item: Data) => item.value === Number(value));
    debugger
    return returnData[0].name;
  }
}

interface Data {
  name: string;
  value: number;
}
