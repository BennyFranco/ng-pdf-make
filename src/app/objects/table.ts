export class Table {
    headers: Row;
    rows: Row[];

    constructor(headers: Row, rows: Row[]) {
        this.headers = headers;
        this.rows = rows;
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
