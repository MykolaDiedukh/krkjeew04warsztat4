$(function () {
    //curl -X POST -i -H "Content-Type: application/json" -d '{"isbn":"34321","title":"Thinking in Java", "publisher":"Helion","type":"programming","author":"Bruce Eckel"}' http://localhost:8282/books
    //curl -X POST -i -H "Content-Type: application/json" -d '{"isbn":"34321","title":"Potop", "publisher":"Ossolineum","type":"belerystyka","author":"Sienkiewicz"}' http://localhost:8282/books

    var bookListDiv = $(".book-list");
    bookListDiv.on("click", ".book-title", handleTitleClick);
    bookListDiv.on("click", ".delete-book-btn", handlDelBtnClick);

    var addBookForm = $(".add-book-form");

    addBookForm.on("submit", handleAddBookSubmit);

    refreshBookList();

    function refreshBookList() {
        // var bookArr = getFromServer();
        renderBookList(bookListDiv);
    }

    function renderBookList(renderingPoint) {
        var url = "http://localhost:8282/books/";

        // $.ajax({
        //     url: "http://localhost:8282/books",
        //     type: "GET",
        //     dataType: "json",
        // }).done(function (booksArr) {
        //     renderingPoint.empty();
        //
        //     for (var i = 0; i < booksArr.length; i++) {
        //         var book = booksArr[i];
        //
        //         var descriptionDiv = $('<div class="description">');
        //         var delBtn = $('<button class="delete-book-btn">Usuń</button>');
        //         var titleDiv = $('<div class="book-title">');
        //         titleDiv.text(book.title);
        //         titleDiv.data("id", book.id);
        //         titleDiv.append(delBtn);
        //         titleDiv.append(descriptionDiv);
        //
        //         renderingPoint.append(titleDiv);
        //     }
        // }).fail(function (xhr, status, err) {
        //     console.log(xhr, status, err);
        // });

        function getBookListSuccess(booksArr) {
            renderingPoint.empty();

            for (var i = 0; i < booksArr.length; i++) {
                var book = booksArr[i];

                var descriptionDiv = $('<div class="description">');
                var delBtn = $('<button class="delete-book-btn">Usuń</button>');
                var titleDiv = $('<div class="book-title">');
                titleDiv.text(book.title);
                titleDiv.data("id", book.id);
                titleDiv.append(delBtn);
                titleDiv.append(descriptionDiv);

                renderingPoint.append(titleDiv);
            }// getBookSuccess
        }
        sendGenericRequest(url, "GET", undefined, getBookListSuccess);
    } // renderListSuccess



        function handleTitleClick() {
            var thisTitle = $(this);
            var id = $(this).data("id");
            var url = "http://localhost:8282/books/" + id;
            // $.ajax({
            //     url: "http://localhost:8282/books/" + id,
            //     type: "GET",
            //     dataType: "json",
            // }).done(function (book) {
            //     var descriptionDiv = thisTitle.find(".description");
            //     descriptionDiv.empty();
            //
            //     var authorDiv = $("<div>");
            //     authorDiv.text("Author: " + book.author);
            //
            //     var publisherDiv = $("<div>");
            //     publisherDiv.text("publisher: " + book.publisher);
            //
            //     var typeDiv = $("<div>");
            //     typeDiv.text("type: " + book.type);
            //
            //     var isbnDiv = $("<div>");
            //     isbnDiv.text("isbn: " + book.isbn);
            //
            //     descriptionDiv.append(authorDiv);
            //     descriptionDiv.append(publisherDiv);
            //     descriptionDiv.append(typeDiv);
            //     descriptionDiv.append(isbnDiv);
            //
            //     descriptionDiv.slideDown();
            // }).fail(function (xhr, status, err) {
            //     console.log(xhr, status, err);
            // });

            function getBookSuccess(book) {
                var descriptionDiv = thisTitle.find(".description");
                descriptionDiv.empty();

                var authorDiv = $("<div>");
                authorDiv.text("Author: " + book.author);

                var publisherDiv = $("<div>");
                publisherDiv.text("publisher: " + book.publisher);

                var typeDiv = $("<div>");
                typeDiv.text("type: " + book.type);

                var isbnDiv = $("<div>");
                isbnDiv.text("isbn: " + book.isbn);

                descriptionDiv.append(authorDiv);
                descriptionDiv.append(publisherDiv);
                descriptionDiv.append(typeDiv);
                descriptionDiv.append(isbnDiv);

                descriptionDiv.slideDown();
            }//getBookSuccess

            sendGenericRequest(url, "GET", undefined, getBookSuccess);
        }//handleTitleClick

        function handleAddBookSubmit() {
            var book = {
                title: this.elements.title.value,
                author: this.elements.author.value,
                publisher: this.elements.publisher.value,
                type: this.elements.type.value,
                isbn: this.elements.isbn.value,
            }
            var url = "http://localhost:8282/books";
            // $.ajax({
            //     url: "http://localhost:8282/books",
            //     type: "POST",
            //     data: JSON.stringify(book),
            //     contentType: "application/json; charset=urf-8",
            //     dataType: "json",
            // }).done(function () {
            //     refreshBookList();
            // }).fail(function (xhr, status, err) {
            //     console.log(xhr, status, err);
            // });

            sendGenericRequest(url, "POST", book, refreshBookList);
            return false;
        }

        function handlDelBtnClick(event) {
            event.stopPropagation();

            var thisTitle = $(this).parent();
            var id = thisTitle.data("id");
            var url = "http://localhost:8282/books/" + id;

            // $.ajax({
            //     url: "http://localhost:8282/books/" + id,
            //     type: "DELETE",
            // }).done(function () {
            //     refreshBookList();
            // }).fail(function (xhr, status, err) {
            //     console.log(xhr, status, err);
            // });

            sendGenericRequest(url, "DELETE", undefined, refreshBookList);
        }

        function sendGenericRequest(url, type, data, sccessHandlerFn) {
            $.ajax({
                url: url,
                type: type,
                data: data === undefined ? "" : JSON.stringify(data),
                contentType: "application/json; charset=urf-8",
                dataType: "json",
            }).done(function (dataReturnedByServer) {
                if (sccessHandlerFn !== undefined) {
                    sccessHandlerFn(dataReturnedByServer);
                }
            }).fail(function (xhr, status, err) {
                console.log(xhr, status, err);
            });
        }

    }

) // DOMContentLoaded