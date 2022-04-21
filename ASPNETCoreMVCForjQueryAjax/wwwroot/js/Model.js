class Model {

    static RequestToServer(json, url, actionAfterResponse, actionElementIDAfterResponse = "", callbackFun = null,
        httpType = "POST", contentType = "application/json; charset=utf-8", isCache = false, dataType = "json") {

        try {
            $.ajax({
                type: httpType,
                url: url,
                contentType: contentType,
                cache: isCache,
                data: json,
                dataType: dataType,
                success: getSuccess,
                error: getFail
            });
        } catch (e) {
            Misc.Alert(e);
        }
        function getSuccess(data, textStatus, jqXHR) {

            switch (actionAfterResponse) {
                default:
                    callbackFun(data)
            }
        };
        function getFail(jqXHR, textStatus, errorThrown) {
            Misc.Alert(jqXHR.status);
        };
    }
     
    static View() {
        try {
            var app = new Vue({
                el: '#view',
                data: {
                    appData: [],
                    count: 0
                },
                methods: {
                    fun: function (json) {                                               

                        var album = document.getElementById("album").checked
                        var song = document.getElementById("song").checked
                        var temp

                        if (album && song) {
                            temp = json.results.filter(obj => obj.kind === "album" || obj.kind === "song")
                        }
                        else if (album) {
                            temp = json.results.filter(obj => obj.kind === "album")
                        }
                        else if (song) {
                            temp = json.results.filter(obj => obj.kind === "song")
                        }
                        else {
                            temp = json.results.filter(obj => obj.kind === "album" || obj.kind === "song")
                        };

                        this.count = temp.length;     
                        window.json = temp;
                        window.table = document.getElementById("table");    

                        temp = Misc.SliceArray(temp, 0, RowNoAtPage());
                                                                                                                
                        this.appData = temp;                                                             

                        document.getElementById("SearchResultShowUp").innerHTML = temp.length < RowNoAtPage() ? temp.length : RowNoAtPage();

                        if (window.json.length === 0) {
                            DOM.TableRowsClear(window.table);
                            Misc.Alert("There is no result being found.")
                        }
                    },

                    view: function () {
                        var name = document.getElementById("name").value;
                        name = Misc.ReplaceAllPatternExistence(name, " ", "+");

                        Model.RequestToServer([], "https://itunes.apple.com/search?term=" + name + "&limit=200", "", "", this.fun)
                    }
                }
            })
        }
        catch (err) {
            Misc.Alert(err.message)
        }
    }
}
