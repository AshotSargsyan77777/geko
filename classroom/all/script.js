document.getElementById('generateBtn').onclick = function() {
    let n = document.getElementById('rowsInput').value;
    let container = document.getElementById('triangle');
    
    container.innerHTML = ''; // Մաքրում ենք հին եռանկյունը
    
    let row = [1]; // Առաջին տողը

    for (let i = 0; i < n; i++) {
        // 1. Տպում ենք տողը HTML-ում (կենտրոնացված)
        container.innerHTML += '<div style="text-align: center; margin: 6px; font-weight: bold;">' + row.join(' &nbsp; ') + '</div>';
        
        // 2. Հաշվում ենք հաջորդ տողը
        let nextRow = [1];
        for (let j = 0; j < row.length - 1; j++) {
            nextRow.push(row[j] + row[j + 1]); // Գումարում ենք կողք-կողքի թվերը
        }
        nextRow.push(1);
        
        row = nextRow; // Անցնում ենք հաջորդ տողին
    }
};