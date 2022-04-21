function GoToTop() {
    DOM.GoToTop();
}
function RowNoAtPage() {
    return 10;
}
function LoadData(json, table, blockNo, button, limit) {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    DOM.WindowOnScrollForGoBack(button, limit);
    if (winScroll === height) {
        var cacheMemory = new CacheData(json, blockNo);
        cacheMemory.AddTableRows(table);
    }
    document.getElementById("SearchResultShowUp").innerHTML = (table.rows.length - 1).toString();
}
var CacheData = /** @class */ (function () {
    function CacheData(json, blockNo) {
        this.json = json;
        this.blockNo = blockNo;
    }
    CacheData.prototype.AddTableRows = function (table) {
        var index;
        index = table.rows.length - 1;
        for (var i = index; i < index + this.blockNo; i++) {
            if (i === this.json.length) {
                break;
            }
            var row = table.insertRow(i);
            for (var j = 0; j < table.rows[0].cells.length; j++) {
                var cell = row.insertCell(j);
                switch (j) {
                    case 0:
                        cell.innerHTML = this.json[i]["artistName"];
                        break;
                    case 1:
                        cell.innerHTML = this.json[i]["kind"];
                        break;
                    case 2:
                        cell.innerHTML = this.json[i]["collectionName"];
                        break;
                    case 3:
                        cell.innerHTML = this.json[i]["trackName"];
                        break;
                    case 4:
                        cell.innerHTML = this.json[i]["collectionCensoredName"];
                        break;
                    case 5:
                        cell.innerHTML = this.json[i]["trackCensoredName"];
                        break;
                    case 6:
                        cell.innerHTML = this.json[i]["artistViewUrl"];
                        break;
                    default:
                        break;
                }
            }
            ;
        }
    };
    return CacheData;
}());
var Misc = /** @class */ (function () {
    function Misc() {
    }
    Misc.Alert = function (value) {
        alert(value);
    };
    Misc.ReplaceAllPatternExistence = function (inputStr, pattern, replacedStr) {
        return inputStr.split(pattern).join(replacedStr);
    };
    Misc.SliceArray = function (array, startIndex, endIndex) {
        return array.slice(startIndex, endIndex);
    };
    return Misc;
}());
var DOM = /** @class */ (function () {
    function DOM() {
    }
    DOM.GoToTop = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    DOM.WindowOnScrollForGoBack = function (button, limit) {
        if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
            button.style.display = "block";
        }
        else {
            button.style.display = "none";
        }
    };
    DOM.TableRowsClear = function (table) {
        var rowCount = table.rows.length;
        for (var x = rowCount - 1; x > 0; x--) {
            table.deleteRow(x);
        }
    };
    return DOM;
}());
//# sourceMappingURL=TypeScript.js.map