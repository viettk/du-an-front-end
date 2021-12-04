import jsPDF from 'jspdf';
import "jspdf-autotable";

function CreatePdf(){
    const a = "viettk";
    const handlePdf =() =>{
        var doc = new jsPDF('landscape', 'px', 'a4', false);
        doc.text(60, 60, 'Hóa đơn mua hàng tại Team7forever');
        doc.text(30, 30, 'Tên khách hàng '+ a);
        doc.autoTable({ html: '#my-table' });

        doc.autoTable({
            head: [['Sản phẩm', 'Email', 'Country']],
            body: [
              ['David', 'david@example.com', 'Sweden'],
              ['Castille', 'castille@example.com', 'Spain'],
              // ...
            ],
          });
        doc.save('table.pdf');
    }

    return(
        <div>
            <button type="button" onClick={handlePdf}>Download</button>
        </div>
    );
}
export default CreatePdf;