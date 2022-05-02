function import_csv(csv_path) {
  fetch(csv_path)
    .then((res) => {
      if (!res.ok) {
        console.log("正常にリクエストを処理できませんでした。");
      }
      return res.text();
    })
    .then((csv_data) => {
      convert_array(csv_data);
    })
    .catch(() => {
      console.log("エラーが発生しました。");
    });
}

function filter(csv_path, filter_key) {
  fetch(csv_path)
    .then((res) => {
      if (!res.ok) {
        console.log("正常にリクエストを処理できませんでした。");
      }
      return res.text();
    })
    .then((csv_data) => {
      const data_string = csv_data.trimEnd("\n").split("\n");
      const key = `${filter_key}`;
      let data_array = [csvSplit(data_string[0])];
      for (let i = 1; i < data_string.length; i++) {
        if (data_string[i].match(key)) {
          data_array[i] = csvSplit(data_string[i]);
        }
      }
      draw_table(data_array);
    })
    .catch(() => {
      console.log("エラーが発生しました。");
    });
}

function csvSplit(line) {
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

function convert_array(csv_data) {
  let data_array = [];
  const data_string = csv_data.trimEnd("\n").split("\n");
  for (let i = 0; i < data_string.length; i++) {
    data_array[i] = csvSplit(data_string[i]);
  }
  draw_table(data_array);
}

function draw_table(data_array) {
  const output_csv_el = document.getElementById("output_sample");
  output_csv_el.innerHTML = "";
  data_array.forEach((elements) => {
    const tr = document.createElement("tr");
    output_csv_el.appendChild(tr);
    elements.forEach((element) => {
      let td = document.createElement("td");
      td.innerText = element;
      tr.appendChild(td);
    });
  });
  document.getElementById("sample_number").innerHTML = `サンプル数: ${data_array.length - 1}`;
}

//let csvfile = "../data/test.csv";
let csvfile = "../data/sample.csv";
import_csv(csvfile);

function filter_samples() {
  const textbox = document.getElementById("filter_all_txt");
  const filter_key = textbox.value;
  filter(csvfile, filter_key);
}
