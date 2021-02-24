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
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
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

      sl.getDataUrl = function(img, factor) {
        // Create canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = (factor/1) * img.width;
        canvas.height = (factor/1) * img.height;
        ctx.drawImage(img, 0, 0, ((factor/1) * img.width), ((factor/1) * img.height));
        return canvas.toDataURL('image/png');
     }

      sl.exportPDF = function () {
        // html2canvas(document.getElementById("imgTemp"), {
        //   useCORS : false,
        //   onrendered: function(canvas) {
        //     let imgData = canvas.toDataURL('image/png');
        //     console.log(imgData);
        //   }
        // });
        let imgTemp = document.getElementById("imgTemp");
        let dataUrl = sl.getDataUrl(imgTemp, 0.85);

        let docDefinition = {
          content:[
            { text: "No." + $scope.documentParam.NO , alignment: "right"},
            { text: "\nจดหมายลาออก" , alignment: "center", fontSize: 20, bold: true},
            { text: "วันที่ " + $scope.documentParam.docDate , alignment: "right"},
            { text: "\nเรื่อง ขอลาออกจากการเป็นพนักงานบริษัท" + $scope.documentParam.subject , alignment: "left"},
            { text: "เรียน " + $scope.documentParam.toEmployer1 , alignment: "left"},
            { text: "ผ่าน " + $scope.documentParam.toEmployer2 , alignment: "left"},
            { text: "\n                     ด้วยข้าพเจ้า " + $scope.documentParam.titleName + " " + $scope.documentParam.myName + " " + $scope.documentParam.surName +
            " เริ่มเข้าทำงานตั้งแต่วันที่ " + $scope.documentParam.startWorkDate + " ปัจจุบันตำแหน่ง " + $scope.documentParam.currentPosition +
            " สังกัด(ฝ่าย/แผนก) " + $scope.documentParam.dept, alignment: "justify", preserveLeadingSpaces: true},
            { text: "\n                     มีความประสงค์ขอลาออกเนื่องจาก " + $scope.documentParam.leaveReason + " โดยให้มีผลตั้งแต่วันที่ " +
            $scope.documentParam.endWorkDate + " เป็นต้นไป", alignment: "justify", preserveLeadingSpaces: true},
            { text: "\n\nจึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ", alignment: "right"},
            { text: "\n\n                                                                                                ลงชื่อ", alignment: "left", preserveLeadingSpaces: true},
            { text: "( " + $scope.documentParam.titleName + " " + $scope.documentParam.myName + " " +
            $scope.documentParam.surName + " )" , alignment: "right"},
            { text: "___________________________________________________________________________________________\n\n" , alignment: "center"},
            { image: dataUrl, alignment: "center" },
          ],
          defaultStyle:{
            font: "THSarabunNew",
            fontSize: 16
          },
        }
        pdfMake.createPdf(docDefinition).open();
      } 
    }

    //#endregion

  }
);
