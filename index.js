let Typer = {
    text: '',
    accessCountTimer: null,
    index: 0,
    speed: 2,
    file: "",
    accessCount: 0,
    deniedCount: 0,
    init: function () {
        this.accessCountTimer = setInterval(function () {
            Typer.updLstChr();
        }, 500);
        $.get(Typer.file, function (data) {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1);
        });
    },
    content: function () {
        return $('#console').html();
    },

    write: function (str) {
        $('#console').append(str);
        return false;
    },

    addText: function (key) {
        if (Typer.text) {
            let cont = Typer.content();
            //It stays
            if (cont.substring(cont.length - 1, cont.length) === '|')
                $('#console').html(
                    $('#console')
                        .html()
                        .substring(0, cont.length - 1),
                );
            if (key.keyCode != 8) {
                Typer.index += Typer.speed;
            }
            let text = Typer.text.substring(0, Typer.index)
            let rtn = new RegExp('\n', 'g');
            $('#console').html(text.replace(rtn, '<br/>'));
            window.scrollBy(0, 50);
        }

        if (key.keyCode != 122) {
            key.returnValue = false;
        }
    },
    updLstChr: function () {
        let cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) === '|')
            $('#console').html(
                $('#console')
                    .html()
                    .substring(0, cont.length - 1),
            );
        else
            this.write("|");
    },
};


Typer.speed = 3;
Typer.file = "robert.txt";
Typer.init();

let timer = setInterval("t();", 30);

function t() {
    Typer.addText({"keyCode": 124748});
    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }
}