class CsvReader {
  constructor(file) {
    this.file = file;
  }

  read(filter_key = "") {
    fetch(this.file)
      .then((res) => {
        if (!res.ok) {
          console.log("The request could not be processed successfully.");
        }
        return res.text();
      })
      .then((data_str) => {
        this._convert(data_str, filter_key);
      })
      .catch(() => {
        console.log("Error occurred.");
      });
  }

  _convert(data_str, filter_key) {
    const data_all = data_str.trimEnd("\n").split("\n");
    let data_arr = [this._split(data_all[0])]; // header
    if (filter_key) {
      for (let i = 1; i < data_all.length; i++) {
        if (data_all[i].match(filter_key)) {
          data_arr[i] = this._split(data_all[i]);
        }
      }
    } else {
      for (let i = 1; i < data_all.length; i++) {
        data_arr[i] = this._split(data_all[i]);
      }
    }
    this._draw(data_arr);
  }

  _split(line) {
    let c = "";
    let s = new String();
    let data = new Array();
    let singleQuoteFlg = false;
    for (let i = 0; i < line.length; i++) {
      c = line.charAt(i);
      if (c == "," && !singleQuoteFlg) {
        data.push(s);
        s = "";
      } else if (c == "," && singleQuoteFlg) {
        s = s + c;
      } else if (c == '"') {
        singleQuoteFlg = !singleQuoteFlg;
      } else {
        s = s + c;
      }
    }
    if (s) {
      data.push(s);
    }
    return data;
  }

  _draw(data_arr) {
    const output_csv_el = document.getElementById("output_sample");
    output_csv_el.innerHTML = "";
    data_arr.forEach((elements) => {
      const tr = document.createElement("tr");
      output_csv_el.appendChild(tr);
      elements.forEach((element) => {
        let td = document.createElement("td");
        td.innerText = element;
        tr.appendChild(td);
      });
    });
    document.getElementById("sample_number").innerHTML = `サンプル数: ${data_arr.length - 1}`;
  }
}

//const file = "../data/sample.csv";
const file = "../data/test.csv";
export const reader = new CsvReader(file);
