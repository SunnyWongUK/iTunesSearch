function GoToTop() {
    DOM.GoToTop()
}

function RowNoAtPage()
{
    return 10;
}

function LoadData(json: object[], table: HTMLTableElement, blockNo: number, button: HTMLButtonElement, limit: number) {

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    DOM.WindowOnScrollForGoBack(button, limit); 

    if (winScroll === height) {
        let cacheMemory = new CacheData(json, blockNo);
        cacheMemory.AddTableRows(table);
    }

    document.getElementById("SearchResultShowUp").innerHTML = (table.rows.length - 1).toString();
}

class CacheData {

    private json: object[];
    private blockNo: number;

    constructor(json: object[], blockNo: number) {

        this.json = json;
        this.blockNo = blockNo;
    }

    public AddTableRows(table: HTMLTableElement) {

        let index: number;
        index = table.rows.length - 1;
                
        for (var i = index; i < index + this.blockNo; i++) {

            if (i === this.json.length) {
                break;
            }

            var row = table.insertRow(i);
            for (var j = 0; j < table.rows[0].cells.length; j++) {

                var cell = row.insertCell(j);
                switch (j)
                {
                    case 0:
                        cell.innerHTML =  this.json[i]["artistName"];            
                        break;

                    case 1:
                        cell.innerHTML = this.json[i]["kind"];           
                        break;

                    case 2:
                        cell.innerHTML =  this.json[i]["collectionName"];            
                        break;

                    case 3:
                        cell.innerHTML =  this.json[i]["trackName"];            
                        break;

                    case 4:
                        cell.innerHTML =  this.json[i]["collectionCensoredName"];            
                        break;

                    case 5:

                        cell.innerHTML = this.json[i]["trackCensoredName"];           
                        break;

                    case 6:
                        cell.innerHTML = this.json[i]["artistViewUrl"];
                        break;     
                    
                    default :
                        break;
                }        
            };           
        }
    }
}

abstract class Misc {

    constructor() {
    }

    public static Alert(value: string) {
        alert(value);
    }

    public static ReplaceAllPatternExistence(inputStr: string, pattern: string, replacedStr: string) {
        return inputStr.split(pattern).join(replacedStr);
    }

    public static SliceArray(array: object[], startIndex: number, endIndex: number) {
        return array.slice(startIndex, endIndex);
    }   
}

abstract class DOM {

    constructor() {
    }
    
    public static GoToTop() {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    public static WindowOnScrollForGoBack(button: HTMLButtonElement, limit: number) {

        if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
            button.style.display = "block";
        }
        else {
            button.style.display = "none";
        }
    }

    public static TableRowsClear(table: HTMLTableElement) {
                
        var rowCount = table.rows.length;

        for (var x = rowCount - 1; x > 0; x--) {
            table.deleteRow(x);
        }
    }
}  
