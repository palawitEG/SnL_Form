var app = angular.module("MyApp", ["ngMaterial", "ngMessages"]);

app.config(function ($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function (date) {
    return moment(date).format("DD-MM-YYYY");
  };
});

app.controller(
  "ApplicationCtrl",
  function appCtrl($sce, $scope, $controller, $log) {
    const sl = this;
    let dateNow = new Date();
    sl.currentNavItem = "leaveForm";

    initialAll();

    $scope.documentParam = {
      NO: 987654321,
      docDate: sl.getDateNowTH(dateNow),
      subject: "",
      toEmployer1: "",
      toEmployer2: "",
      titleName: "",
      myName: "",
      surName: "",
      startWorkDate: sl.getDateNowTH(dateNow),
      endWorkDate: sl.getDateNowTH(dateNow),
      currentPosition: "",
      dept: "",
      leaveReason: "",
    };

    $scope.gens = "ชาย หญิง".split(" ").map(function (gen) {
      return { abbrev: gen };
    });

    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf'
      }
    }

    //#region functions
    function initialAll () {
      sl.goto = function (page) {
        $scope.status = "Goto " + page;
      };
  
      sl.getDateNowTH = function (now) {
        // now = new Date();
        var thday = new Array(
          "อาทิตย์",
          "จันทร์",
          "อังคาร",
          "พุธ",
          "พฤหัส",
          "ศุกร์",
          "เสาร์"
        );
        var thmonth = new Array(
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม"
        );
  
        return (
          now.getDate() +
          " " +
          thmonth[now.getMonth()] +
          " " +
          (now.getFullYear() + 543)
        );
      };
  
      sl.onDateChanged = function (d, key) {
        if (key == 1) {
          $scope.documentParam.startWorkDate = sl.getDateNowTH(d);
        } else {
          $scope.documentParam.endWorkDate = sl.getDateNowTH(d);
        }
      };
  
      sl.exportPDF = function () {
        let docDefinition = {
          content:[
            { text: 'Palawit Palasak', alignment: "center"}
          ],
          defaultStyle:{
            font: "THSarabunNew"
          }
        }
        pdfMake.createPdf(docDefinition).download("form.pdf");
      } 
    }

    //#endregion

  }
);
