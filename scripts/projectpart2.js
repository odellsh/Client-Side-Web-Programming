const languageURL = 'https://student2.cs.appstate.edu/' + 'swansonja/project/data_language.php';
const projectURL = 'https://student2.cs.appstate.edu/' + 'swansonja/project/data_projects.php';
const studyAbroadURL = 'https://student2.cs.appstate.edu/' + 'swansonja/project/data_study_abroad.php';

function getAllLanguages() {
    let langValue = new Set();
    let profValue = new Set();

    $.ajax({
        url: languageURL,
        dataType: 'jsonp',
        success: function(data) {
            $("#langChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                langValue.add(value.Language);
            })
            langValue.forEach(function(value) {
                $("#langChoice").append($('<option></option>').val(value).html(value));
            })
            $("#profChoice").append($('<option disabled></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                profValue.add(value.Proficiency);
            })
            profValue.forEach(function(value) {
                if (value == 'low') {
                    $("#profChoice").append($('<option selected></option>').val(value).html(value));
                } else {
                    $("#profChoice").append($('<option></option>').val(value).html(value));
                }
            })
        }
    });
}

function getAllProjects() {
    let deptValue = new Set();
    let collegeValue = new Set();
    let countryValue = new Set();
    let lastNameValue = new Set();

    $.ajax({
        url: projectURL,
        dataType: 'jsonp',
        success: function(data) {
            $("#academDeptChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                deptValue.add(value.AcademicDepartment);
            })
            deptValue.forEach(function(value) {
                $("#academDeptChoice").append($('<option></option>').val(value).html(value));
            })
            $("#academCollegeChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                collegeValue.add(value.AcademicCollege);
            })
            collegeValue.forEach(function(value) {
                $("#academCollegeChoice").append($('<option></option>').val(value).html(value));
            })
            $("#countryChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                countryValue.add(value.Country);
            })
            countryValue.forEach(function(value) {
                $("#countryChoice").append($('<option></option>').val(value).html(value));
            })
            $("#lastNameChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                lastNameValue.add(value.Lastname);
            })
            lastNameValue.forEach(function(value) {
                $("#lastNameChoice").append($('<option></option>').val(value).html(value));
            })
        }
    });
}

function getAllStudyAbroadChoices() {
    let termValue = new Set();
    let program = new Set();
    let studyAbroadCountryValue = new Set();
    let studyAbroadDateValue = new Set();

    $.ajax({
        url: studyAbroadURL,
        dataType: 'jsonp',
        success: function(data) {
            $("#termChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                termValue.add(value.Term);
            })
            termValue.forEach(function(value) {
                $("#termChoice").append($('<option></option>').val(value).html(value));
            })
            $("#progChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                program.add(value.ProgramName);
            })
            program.forEach(function(value) {
                $("#progChoice").append($('<option></option>').val(value).html(value));
            })
            $("#studyAbroadCountryChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                studyAbroadCountryValue.add(value.Countries);
            })
            studyAbroadCountryValue.forEach(function(value) {
                $("#studyAbroadCountryChoice").append($('<option></option>').val(value).html(value));
            })
            $("#datesChoice").append($('<option></option>').val('default').html('Select'));
            $.each(data, function(key, value) {
                studyAbroadDateValue.add(value.Dates);
            })
            studyAbroadDateValue.forEach(function(value) {
                $("#datesChoice").append($('<option></option>').val(value).html(value));
            })
        }
    });
}

function submit() {
    $('#langAndProfSelection').submit(function(event) {
        event.preventDefault();

        let langValue = $('#langChoice').val();
        let profValue = $('#profChoice').val();
        if (profValue == 'low') {
            profValue = ['low', 'med', 'high'];
        }
        else if (profValue == 'med') {
            profValue = ['med', 'high'];
        }
        else if(profValue == 'high'){
            profValue = ['high'];
        }
        getLangProfTuple(langValue, profValue);
    });

    $('#programSelection').submit(function(event) {
        event.preventDefault();

        let deptValue = $('#academDeptChoice').val();
        let collegeValue = $('#academCollegeChoice').val();
        let countryValue = $('#countryChoice').val();
        let lastNameValue = $('#lastNameChoice').val();
        getProjTupleSet(deptValue, collegeValue, countryValue, lastNameValue);
    });

    $('#studyAbroadSelection').submit(function(event) {
        event.preventDefault();

        let termValue = $('#termChoice').val();
        let program = $('#progChoice').val();
        let countryValue = $('#studyAbroadCountryChoice').val();
        let studyAbroadDateValue = $('#datesChoice').val();
        getStAbrTupleSets(termValue, program, countryValue, studyAbroadDateValue);
    });
}

function getLangProfTuple(langValue, profValue){
    $.ajax({
        url: languageURL,
        dataType: 'jsonp',
        success: function(data) {
            let tuple = data.filter(
                function (obj) {
                return profValue.includes(obj.Proficiency) 
                    && langValue.includes(obj.Language);
                });            
            let table = addTable(tuple);
            $("#langAndProf").html(table);
            submit();
        }
    });
}  

function getProjTupleSet(deptValue, col, countryValue, lastNameValue) {
    $.ajax({
        url: projectURL,
        dataType: 'jsonp',
        success: function(data) {
            let tuple1 = data.filter(
                function (obj) {
                    return deptValue == obj.AcademicDepartment; 
                }
            );
            let tuple2 = tuple1.filter(
                function (obj) {
                    return col == obj.AcademicCollege;
                }
            );
            let tuple3 = tuple2.filter(
                function(obj) {
                    return countryValue == obj.Country;
                }
            );
            let tuple4 = tuple3.filter(
                function(obj) {
                    return lastNameValue == obj.Lastname;
                }
            );

            let p = 'Project Description: ';
            p += tuple4[0].Country + ' - ';
            p += tuple4[0].Collaboration;
            if (tuple4[0].Location) {
                p += ' - ' + tuple4[0].Location;
            }
            $('#projectTable').html(p);
            
            let table = addTable(tuple4);
            $('#projectTable').append(table);
        }
    }); 
}

function getStAbrTupleSets(termValue, program, countryValue, studyAbroadDateValue) {
    $.ajax({
        url: studyAbroadURL,
        dataType: 'jsonp',
        success: function(data) {
            let tuple1 = data.filter(
                function (obj) {
                    return termValue == obj.Term; 
                }
            );
            let tuple2 = tuple1.filter(
                function (obj) {
                    return program == obj.ProgramName;
                }
            );
            let tuple3 = tuple2.filter(
                function(obj) {
                    return countryValue == obj.Countries;
                }
            );
            let tuple4 = tuple3.filter(
                function(obj) {
                    return studyAbroadDateValue == obj.Dates;
                }
            );
            
            let table = addTable(tuple4);
            $('#studyAbroadTable').html(table);
        }
    }); 
}

function addTable(data) {
    let table = document.createElement('table');
    addTh(table, Object.keys(data[0]));
    for (let obj of data) {
        addRow(table, obj);
    }
    return table;
}

function addTh(table, obj) {
    let row = document.createElement('tr');
    for (let i = 0; i < obj.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = obj[i];
        row.appendChild(th);
    }
    table.appendChild(row);
}

function addRow(table, obj) {
    let row = document.createElement('tr');
    for (let field in obj) {
        let cell = document.createElement('td');
        cell.textContent = obj[field];
        row.appendChild(cell);
    }
    table.appendChild(row);
}

$(function start() {
    getAllLanguages();
    getAllProjects();
    getAllStudyAbroadChoices();
    submit();
});