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

    constructor(content: string) {
        this.content = content;
    }
}

export class Row {
    cells: Cell[];

    constructor(cells: Cell[]) {
        this.cells = cells;
    }
}
