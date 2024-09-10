document.getElementById('show-table').addEventListener('click', function() {
    // Initialize DataTable when the button is clicked
    $('#table').DataTable({
        // scrollY: 600,
        // paging: false
        "order": [[1, 'desc']],
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });
});