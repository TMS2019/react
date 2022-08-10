import swal from "sweetalert";
import ApiService from "./ApiService";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class ButtonService {

    DeleteData = (param, id) => {
        swal({
            title: "Are you sure?",
            text: "Delete data!",
            icon: "warning",
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'Delete!',
                    text: 'Data deleted',
                    icon: 'success'
                }).then(function () {
                    //Delete
                    ApiService.deleteData(param, id);
                    window.location.reload();
                });
            } else {
                swal("Cancelled", "Cancel Delete", "error");
            }
        });
    }

    ExportPDF = (data, title) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        var headers;
        var data2;
        switch (title) {
            case 'Airline':
                headers = [["Code", "Int", "Airline", "Entry Date"]];
                data2 = data.map(elt => [elt.masterCode, elt.abbreviation, elt.name, elt.createdOn]);
                break;
            case 'Airport':
                headers = [["Code", "Int", "Airport","City Name", "Entry Date"]];
                data2 = data.map(elt => [elt.masterCode, elt.abbreviation, elt.name,elt.cityName, elt.createdOn]);
                break;
            default:
        }

        let content = {
            startY: 50,
            head: headers,
            body: data2
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(title + ".pdf")

        swal({
            title: title,
            text: "Export to PDF!",
            icon: "success",
            button: "Ok",
        });
    }


    ExportExcel = (data, title) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data1 = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data1, title + fileExtension);
        swal({
            title: title,
            text: "Export to Excel!",
            icon: "success",
            button: "Ok",
        });
    }


    Simpan = (titleModal, title, param, data) => {
        var msg = ''
        console.log(param + " " + data);

        if (titleModal === 'Add') {
            ApiService.createData(param, data);
            msg = "Berhasil Tambah Data";
        } else {
            ApiService.updateData(param, data);
            msg = 'Berhasil Update Data'
        }
        swal({
            title: msg,
            text: title,
            icon: "success",
            button: "Ok",
        });
    }
}

export default new ButtonService()