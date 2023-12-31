function doGet(e) {
    const userEmail = Session.getActiveUser().getEmail();
    var htmlOutput =  HtmlService.createTemplateFromFile('Index');
    htmlOutput.email = userEmail;
    return htmlOutput.evaluate();
}

function getJobs() { 
var ss= SpreadsheetApp.getActiveSpreadsheet();
var jobSheet = ss.getSheetByName("JOBS");
var [headers, ...data] = jobSheet.getDataRange().getValues();
return data;
}

function AddRecord(job, note, startDate, endDate) {
const userEmail = Session.getActiveUser().getEmail();
var ss= SpreadsheetApp.getActiveSpreadsheet();
var employeeSheet = ss.getSheetByName("EMPLOYEES");
var [headers, ...data] = employeeSheet.getDataRange().getValues();
for(var i = 0; i < data.length; i++)
{
    if(data[i][2] == userEmail)
    {
    var firstname = data[i][0];
    var lastname = data[i][1];
    break;
    }
}
var timeSheet = ss.getSheetByName("TIME SHEET");
var nextRow = timeSheet.getLastRow() + 1;
timeSheet.appendRow([firstname, 
                    lastname, 
                    startDate, 
                    endDate, 
                    '=ROUND((D'+nextRow+'-C'+nextRow+')*24, 2)', 
                    job, 
                    note, 
                    new Date()]);
return 'Record Added';
}