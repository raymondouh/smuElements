function jsonSaver() {
    const originalData = {
        field1: 1,
        field2: 2,
        dield3: [{
                field1: 1,
                field2: 2
            },
            {
                field1: 1,
                field2: 2
            }
        ]
    };

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", "data.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
