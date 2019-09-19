export class Table {
  headers: Row;
  rows: Row[];
  widths: any[];

  constructor(headers: Row, rows: Row[], widths?: any[]) {
    this.headers = headers;
    this.rows = rows;
    this.widths = widths;
  }
}

export class Cell {
  content: string;
  style: any | string;

  constructor(content: string, style?: any | string) {
    this.content = content;
    this.style = style;
  }

  get(): any {
    return { text: this.content, style: this.style };
  }
}

export class Row {
  cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  get(): any {
    const row = [];
    for (const cell of this.cells) {
      row.push(cell.get());
    }

    return row;
  }
}
