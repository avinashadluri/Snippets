$(function() {
// declaration area
  var testResultsCount = $(".downloadLinkForTestResults").length;
  var diagramFilesCount = $(".uploadedDiagramsDiv").length;
  var testResultsNames = [];
  var count = $(".custom-name").length;
  var counts = [];
  var diagramFiles = [];
  $(".deleteUploadedDiagram").each(function(i, k) {
    diagramFiles.push($(this).attr('filename'));
  });
  counts["clientpluginsRemoveCount"] = $(".clientpluginsName").length;
  counts["webserversRemoveCount"] = $(".webserverpluginsName").length;
  counts["ssoHeaderVariablesRemoveCount"] = $(".headerAttrName").length;
  counts["policyURIPatternsRemoveCount"] = $(".protectedUrlUsers").length;
  counts["protectedURIPatternsRemoveCount"] = $(".unProtectedUrls").length;
  counts["appServersRemoveCount"] = $(".appservertype").length;
  counts["portRemoveProdCount"] = $(".prodFields").find(".ipaddress").length;
  counts["portRemoveNonProdCount"] = [];
  $(".nonProdFields").each(function(ind, el) {
      counts["portRemoveNonProdCount"][ind] = $(this).find(".ipaddress").length;
  });

  var validation = false;
// declaration area ends

// initialize area 

  $(".accordion" ).accordion({
      collapsible: true,
      heightStyle: "content"
    });
 
  $('[data-toggle="tooltip"]').tooltip();
 

  $("select.flexselect").flexselect({
    allowMismatch: true,
    inputNameTransform:  function(name) { return "wsso_" + name; }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
  });
  $("#agreeCheckbox").on("click", function() {
    $("#formSubmit").attr("disabled", !this.checked);
  });
  $(".btnNext").click(function () {
    var inc = 1;
    if($(this).hasClass('next5') && $('.tabs-6').is(':hidden') && $(".tabs-7").is(':visible')) {
      inc = 2;
    }
    $( "#tabs" ).tabs( "option", "active", $("#tabs").tabs('option', 'active')+inc );
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $(".btnPrev").click(function () {
    var inc = 1;
    if($(this).hasClass('prev7') && $('.tabs-6').is(':hidden') && $(".tabs-7").is(':visible')) {
      inc = 2;
    }
    $( "#tabs" ).tabs( "option", "active", $("#tabs").tabs('option', 'active')-inc );
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
// initialize area ends

// webserver version dropdowns dynamic data code
  // on click
  $(document).on('click', '#webserverversion', function(event) {
    if($(this).attr('action') != 'false') {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([]),
          contentType: "application/json",
          success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {   
                $("#webserverversion").html('<option value="">Choose Web server version </option>');
                $(data.records).each(function (i) { 
                  $("#webserverversion").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
                $("#webserverversion").append("<option value='None of the above'>None of the above</option>");
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
           },
          error: function(e) {
            $.blockUI({ 
                message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
      $(this).attr('action', 'false');
      this.blur();
      window.focus();
      return false;
    }
  });
  $(document).on('click', '#webServerBitMode', function(event) {
    if($(this).attr('action') != 'false') {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([webserverversionValue]),
          contentType: "application/json",
          success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {   
                $("#webServerBitMode").html('<option value="">Choose Web Server Bit Mode </option>');
                $(data.records).each(function (i) { 
                  $("#webServerBitMode").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
           },
          error: function(e) {
            $.blockUI({ 
                message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
      $(this).attr('action', 'false');
      this.blur();
      window.focus();
      return false;
    }
  });
  $(document).on('click', '#osVersion', function(event) {
    if($(this).attr('action') != 'false') {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      var webServerBitModeValue = $("#webServerBitMode").val();
      $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([webserverversionValue,webServerBitModeValue]),
          contentType: "application/json",
          success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {   
                $("#osVersion").html('<option value="">Choose OS version </option>');
                $(data.records).each(function (i) { 
                  $("#osVersion").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
           },
          error: function(e) {
            $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
      $(this).attr('action', 'false');
      this.blur();
      window.focus();
      return false;
    }
  });
  $(document).on('click', '#osBitMode', function(event) {
    if($(this).attr('action') != 'false') {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      var webServerBitModeValue = $("#webServerBitMode").val();
      var osVersionValue = $("#osVersion").val();
      $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([webserverversionValue,webServerBitModeValue,osVersionValue]),
          contentType: "application/json",
          success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {   
                $("#osBitMode").html('<option value="">Choose OS bit mode </option>');
                $(data.records).each(function (i) { 
                  $("#osBitMode").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
           },
          error: function(e) {
            $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
      $(this).attr('action', 'false');
      this.blur();
      window.focus();
      return false;
    }
  });
  $(document).on('click', '#processorType', function(event) {
    if($(this).attr('action') != 'false') {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      var webServerBitModeValue = $("#webServerBitMode").val();
      var osVersionValue = $("#osVersion").val();
      var osBitModeValue = $("#osBitMode").val();
      $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([webserverversionValue,webServerBitModeValue,osVersionValue,osBitModeValue]),
          contentType: "application/json",
          success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {   
                $("#processorType").html('<option value="">Choose processor type </option>');
                $(data.records).each(function (i) { 
                  $("#processorType").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
           },
          error: function(e) {
            $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
      $(this).attr('action', 'false');
      this.blur();
      window.focus();
      return false;
    }
  });
  // on change
  $(document).on('change', '#webserverversion', function(event) {
    var thisValue = $(this).val();
    $("#webServerBitMode,#osVersion,#osBitMode,#processorType").hide().removeClass('required').html(''); 
    if(thisValue && thisValue != 'None of the above') {
      
        $(".onNoneOfTheAboveSection").hide().find(".form-control").val('').removeClass('required');
        $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
        });
        $.ajax({
          url: domainPath+"getWebServerDetails",
          type: "POST",
          data: JSON.stringify([thisValue]),
          contentType: "application/json",
          success: function(data) {
              if(data.success == true) {
                if(data.records.length > 0) {
                  $("#webServerBitMode").addClass("required").show().html("<option value=''>Choose Web server bit mode </option>");
                  $(data.records).each(function (i) { 
                    $("#webServerBitMode").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                  });
                  $("#webServerBitMode,#osVersion,#osBitMode,#processorType").attr('action', 'false');
                }
                $.unblockUI();
              }else {
                $.blockUI({ 
                    message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
                });              
              }
           },
          error: function(e) {
              $.blockUI({ 
                  message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
              });
          }
       });
    }else{
      
      $(".onNoneOfTheAboveSection").show().find(".form-control").val('').addClass('required');
    }
  });
  $(document).on('change', '#webServerBitMode', function(event) {
    var thisValue = $(this).val();
    $("#osVersion,#osBitMode,#processorType").hide().removeClass('required').html(''); 
    if(thisValue) {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      $.ajax({
        url: domainPath+"getWebServerDetails",
        type: "POST",
        data: JSON.stringify([webserverversionValue,thisValue]),
        contentType: "application/json",
        success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {
                $("#osVersion").addClass("required").show().html("<option value=''>Choose OS version </option>");
                $(data.records).each(function (i) { 
                  $("#osVersion").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
                $("#osVersion,#osBitMode,#processorType").attr('action', 'false');
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
         },
        error: function(e) {
            $.blockUI({ 
                message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
        }
     });
    }
  });
  $(document).on('change', '#osVersion', function(event) {
    var thisValue = $(this).val();
    $("#osBitMode,#processorType").hide().removeClass('required').html(''); 
    if(thisValue) {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      var webServerBitModeValue = $("#webServerBitMode").val();
      $.ajax({
        url: domainPath+"getWebServerDetails",
        type: "POST",
        data: JSON.stringify([webserverversionValue,webServerBitModeValue,thisValue]),
        contentType: "application/json",
        success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {
                $("#osBitMode").addClass("required").show().html("<option value=''>Choose OS bit mode </option>");
                $(data.records).each(function (i) { 
                  $("#osBitMode").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
                $("#osBitMode,#processorType").attr('action', 'false');
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
         },
        error: function(e) {
            $.blockUI({ 
                message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
        }
     });
    }
  });
  $(document).on('change', '#osBitMode', function(event) {
    var thisValue = $(this).val();
    $("#processorType").hide().removeClass('required').html(''); 
    if(thisValue) {
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait, data is loading!</h3>", 
      });
      var webserverversionValue = $("#webserverversion").val();
      var webServerBitModeValue = $("#webServerBitMode").val();
      var osVersionValue = $("#osVersion").val();
      $.ajax({
        url: domainPath+"getWebServerDetails",
        type: "POST",
        data: JSON.stringify([webserverversionValue,webServerBitModeValue,osVersionValue,thisValue]),
        contentType: "application/json",
        success: function(data) {
            if(data.success == true) {
              if(data.records.length > 0) {
                $("#processorType").addClass("required").show().html("<option value=''>Choose processor type </option>");
                $(data.records).each(function (i) { 
                  $("#processorType").append("<option value=\""+data.records[i]+"\">"+data.records[i]+"</option>");
                });
                $("#processorType").attr('action', 'false');
              }
              $.unblockUI();
            }else {
              $.blockUI({ 
                  message: "<h3>Webserver data loading failed<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });              
            }
         },
        error: function(e) {
          $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
          });                          
        }
     });
    }
  });
// webserver version dropdowns dynamic data code ends

// file upload code for diagram env 
  // $(document).on('click', '#diagramfileUpload', function(event) {
  $("#diagramfile").on("change", function() {
    var files = document.getElementById('diagramfile').files;
    var filesCount = files.length+diagramFilesCount;
    var uploadedFilesArray = [];
    if(files.length == 0){
      $.blockUI({ 
        message: "<h3>Please select files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }else if(files.length > 5){
      $.blockUI({ 
        message: "<h3>You can upload maximum 5 files at a time<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
      $('#diagramfile').val('');
    }else if(filesCount > 10){
      $.blockUI({ 
        message: "<h3>Total files should not exceed 10 <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
      $('#diagramfile').val('');
    }else {
      var tempFiles = [];
      var failedFiles = [];
      var file = new FormData();
      var fileInfo = document.getElementById('diagramfile').files;

      $(".uploadedDiagramsDiv").each(function(j, elj) {
        if(uploadedFilesArray.indexOf($(this).find(".downloadLinkForDiagrams a").html()) < 0) {
          uploadedFilesArray.push($(this).find(".downloadLinkForDiagrams a").html());
        }
      });

      for(var i=0; i<fileInfo.length;i++) {
        var parts = fileInfo[i].name.split('.');
        var ext = parts[parts.length-1];

        if(uploadedFilesArray.indexOf(fileInfo[i].name) >= 0) {
            if (confirm("It seems that the file "+fileInfo[i].name+" is already uploaded, do you want to proceed still ?") == false) {
                $('#diagramfile').val('');
                return false;
            }
        }

        if(ext.toLowerCase() != 'doc' && ext.toLowerCase() != 'docx' && ext.toLowerCase() != 'pdf' && ext.toLowerCase() != 'ppt'&& ext.toLowerCase() != 'pptx' && ext.toLowerCase() != 'vsd' && ext.toLowerCase() != 'vsdx') {            
            $.blockUI({ 
              message: "<h3>Please upload only .doc,.pdf,.docx,.pptx,.ppt,.vsd,.vsdx files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
            $('#diagramfile').val('');
            return false;
        }
        if(fileInfo[i].size > 5*1024*1024) {
            $.blockUI({ 
              message: "<h3>Maximum file limit is 5MB, "+fileInfo[i].name+" exceeded it <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
            $('#diagramfile').val('');
            return false;
        }
      
        file.append('file_'+i,fileInfo[i]);  
        file.append('type','diagram');  
        file.append('tro',troNum);
        tempFiles[i] = fileInfo[i].name;
      }
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
      });
      $.ajax({
        url: domainPath+"wssoFileUpload",
        type: "POST",
        data: file,
        dataType: 'text',
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        success: function(response) {
          response = jQuery.parseJSON(response);
          if(response.success == true) {
            $(response.records).each(function (k,v) { 
              if(v) {
                var uploadedDiagrams = '<div class="row uploadedDiagramsDiv"><div class="col-md-6 downloadLinkForDiagrams"><a href="'+domainPath+"download?fileName="+v+"&intgId="+intgId+"&tro="+troNum+"&type=diagram"+'" class="" target="_BLANK">'+tempFiles[k] +'</a></div><div class="col-md-3"><button type="button" class="btn btn-danger btn-xs deleteUploadedDiagram" filename="'+tempFiles[k] +'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button></div></div>';
                $(".uploadedDiagrams").append(uploadedDiagrams);      
                $('#diagramfile').val('');
                diagramFiles.push(v);

                diagramFilesCount++;
              }else {
                $.blockUI({ 
                  message: tempFiles[k]+" File upload failed, please try again <br><br><button type='button' class='btn btn-primary closeError'>OK</button>", 
                });
              }
            }); 
            $.unblockUI();
          }else {
            $.blockUI({ 
              message: "<h3>"+response.message +"<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
          }
        },
        error: function(e) {
          $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again. <br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
          });
        }
      });
    }
  });
// file upload code ends

// delete file diagram
 $(document).on('click', '.deleteUploadedDiagram', function(event) {
    if(diagramFilesCount) {
      var thisFile = $(this).attr("filename");  
      var thisValue = $(this);
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
      });

     /* var thisURL = domainPath+"wssoDeleteUploadFiles?fileName="+thisFile+"&intgId="+intgId+"&tro="+troNum+"&type=diagram";*/
      var deletPostData = {"fileName":thisFile, "intgId":intgId, "tro":troNum, "type":"diagram"};
      $.ajax({
      url: domainPath+"wssoDeleteUploadFiles",
      type: "POST",
      data: deletPostData,
      dataType: "json",
      /*contentType: "application/json", */       
      success: function(response) {          
        if(response.success == true) {
          thisValue.closest('.uploadedDiagramsDiv').fadeOut('slow').remove();
          diagramFilesCount--;
          diagramFiles.splice(diagramFiles.indexOf($(this).attr('filename')),1);
          $.unblockUI();
        }else {
          $.blockUI({ 
              message: "<h3>Uploaded file deletion failed:"+response.message+"<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
        }
      },
      error: function(e) {
        $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again. <br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button> !</h3>", 
        });
      }
      });
    }else {
      $.blockUI({ 
        message: "<h3>Please upload files first <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }
  });
// delete file diagram ends

// datepicker actions
  $(document).on('click', '.date-picker', function(event) {
      $(this).css({
        "border": "",
      });
      var pickerCount = $(this).attr("count");
      if(pickerCount > 1) {
        if($("#customtime"+(parseInt(pickerCount)-1)).val()) {
          var lastDate = $("#customtime"+(parseInt(pickerCount)-1)).val();
          var lastDateParts = lastDate.split('/'); 
          var newDate = new Date(lastDateParts[2],lastDateParts[0]-1,lastDateParts[1]); 
          var todayDate = new Date();
          if (todayDate.getTime() > newDate.getTime()) {
            var pickerMinimumDate = 1;
          }else { 
            var pickerMinimumDate = $("#customtime"+(parseInt(pickerCount)-1)).val();
          }
          $(this).datepicker({ minDate: pickerMinimumDate });
          $(this).datepicker("show");
        }else {
          $.blockUI({ 
            message: "<h3>Please select Non-Prod Environment "+(parseInt(pickerCount)-1)+"'s date first. <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
          });
        }
      }else {
        $(this).datepicker({ minDate: 1 });
        $(this).datepicker("show");
      }
  });
  $(document).on('change', '.date-picker', function() {
    var pickerCountTemp = $(this).attr("count");
    $(".date-picker").each(function(ind, el) {
      if(parseInt($(this).attr("count")) > pickerCountTemp) {
        $(this).val('');
        $(this).datepicker("destroy");
      }
    });
    $(".date-picker-prd").val('');
    $(".date-picker-prd").datepicker("destroy");
  });
  $(document).on('click', '.date-picker-prd', function(event) {
    var allPickersFilled = true;
    $(".date-picker").each(function(ind, el) {
      if(!($(this).val())) {
        allPickersFilled = false;
      }
    });
    if(allPickersFilled) {
      var lastDate = $(".date-picker").last().val();
      var lastDateParts = lastDate.split('/'); 
      var newDate = new Date(lastDateParts[2],lastDateParts[0]-1,lastDateParts[1]); 
      var todayDate = new Date();
      if (todayDate.getTime() > newDate.getTime()) {
        var pickerMinimumDate = 1;
      }else { 
        var pickerMinimumDate = $(".date-picker").last().val();
      }
      $(this).datepicker({ minDate: pickerMinimumDate, beforeShowDay: function(date){ 
        var day = date.getDay(); 
        return [day == 2 || day == 4,""];
      } });
      $(this).datepicker("show");
      $(this).css({
        "border": "",
      });
    }else {
      $(".date-picker-prd").val('');
      $(".date-picker-prd").datepicker("destroy");
      $.blockUI({ 
        message: "<h3>Please fill Non-Prod Environment's first. <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
      });
    }
  });
// datepicker actions ends

// Add More Button actions
  $(document).on("click", '#addNonProdEnv', function() {
    if(count<25)
    {
      count++;
      var customFieldset = '<h1 class="customNonProds nonProdFieldsHeading'+count+'">Non-Prod Environment '+count+'</h1><div  class="nonProdFields"><input type="hidden" class="form-control input-sm envId"   value=""><div class="row"><div class="col-md-5">Name of the Environment</div><div class="col-md-5">Deployment Date</div></div><div class="row"><div class="col-md-5"><input type="text" class="form-control custom-name input-sm required lowercase" id="customname'+count+'" name="customname'+count+'"  placeholder="Name"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-5 input-group form-group"><input type="text" class="form-control date-picker custom-date input-sm required" count="'+count+'" id="customtime'+count+'"  name="customtime'+count+'" placeholder="Project Timeline"  readonly><label for="customtime'+count+'" class="input-group-addon btn input-sm"><span class="glyphicon glyphicon-calendar"></span></label></div><div class="col-md-2 remove-section"><button type="button" class="btn btn-danger btn-xs removeNonProdEnv"><span class="glyphicon glyphicon-minus " aria-hidden="true"></span> Remove</button></div></div><div class="row"><div class="col-md-6"><p>What URL will end-users use to access the environment?<img src="/IAMPortal/app/img/helpbubble.png" width="20" height="20" class="helpbubble" data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-html="true" data-content="Recommended to use appl.kp.org domain. Using a kp.org domain will need additional approval from branding <a class=\'helpbubblelink\' href=\'http://kpnet.kp.org:81/kpit/forms/asm/wdg/dns_form.html\'>(http://kpnet.kp.org:81/kpit/forms/asm/wdg/dns_form.html)</a> that the application team needs to request." /></p><input type="text" class="form-control input-sm endUserUrl required url" id="endUserUrl'+count+'" name="endUserUrl'+count+'"  placeholder="example:https://dev.kp.org/test"><div class="errorMessage content-hide">This should not be empty</div> <div class="checkbox"><label><input type="checkbox" class="endUserUrlCheck"> <small> Is this end-user URL currently in use?</small> </label> </div> </div><div class="col-md-6"><p>What is the application back-end url for this environment?<img alt="Help Bubble" src="/IAMPortal/app/img/helpbubble.png" width="20" height="20" class="helpbubble" data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-html="true" data-content="Please enter the full URL, where your application can be accessed from browser." /></p><input type="text" class="form-control input-sm appBackendUrl url" id="appBackendUrl'+count+'" name="appBackendUrl'+count+'"  placeholder="Until directed, please leave this blank"><div class="errorMessage content-hide">This should not be empty</div></div></div><div class="row"><div class="col-md-6  inside-content"><p>Is there a WSSO policy prefix for this environment?</p><div class="env-options"><div class="radio"><label class="radio-inline"><input type="radio" name="wssoPolicyPrefix'+count+'" class="wssoPolicyPrefix wssoPolicyPrefixShow required" id="wssoPolicyPrefixYes'+count+'" value="Yes">Yes</label><label class="radio-inline"><input type="radio" name="wssoPolicyPrefix'+count+'" class="wssoPolicyPrefix wssoPolicyPrefixHide required" id="wssoPolicyPrefixNo'+count+'" value="No">No</label></div><div class="form-group wssoPolicyPrefix-explain content-hide"><input type="text" class="form-control input-sm wssoPolicyPrefixText"    placeholder="example:/example/*"><div class="errorMessage content-hide">This should not be empty</div></div></div></div><div class="col-md-6 inside-content"><p>Will this application use a load balancer?</p><div class="env-options"><div class="radio"><label class="radio-inline"><input type="radio" name="wssoLoadBalancer'+count+'" class="wssoLoadBalancer wssoLoadBalancerShow required" id="wssoLoadBalancerYes'+count+'" value="Yes">Yes</label><label class="radio-inline"><input type="radio" name="wssoLoadBalancer'+count+'" class="wssoLoadBalancer wssoLoadBalancerHide required" id="wssoLoadBalancerNo'+count+'" value="No">No</label></div><div class="form-group wssoLoadBalancer-explain content-hide"><input type="text" class="form-control input-sm wssoLoadBalancerText url"    placeholder="Please provide the load balancer\'s health check URL"><div class="errorMessage content-hide">This should not be empty</div></div></div></div></div><div class="row "><div class="col-md-9"><p>Please provide your IP address, hostnames, FQDN, and ports:</p></div></div><div class="portSection"><div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm required ipaddress"    placeholder="IP Address (eg:172.01.01.01)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2 "><input type="text" class="form-control input-sm required hostname"    placeholder="Hostnames (eg:dev)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required fqdn"    placeholder="FQDN(eg:dev.kp.org)""><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required ports"    placeholder="Ports (eg:8080,8000)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><button type="button" class="btn btn-success btn-xs forNonProd portAdd" count="'+count+'"><span class="glyphicon glyphicon-plus " aria-hidden="true"></span> Add</button></div></div></div></div> ';
      $(".nonProdArea").append(customFieldset);
      $('.accordion').accordion("refresh"); 
      $('[data-toggle="popover"]').popover();       
      $(".date-picker-prd").val('');
      $(".date-picker-prd").datepicker("destroy");
      $(".rows-count").html(count+" Non-Prod environment(s) added");
    }else {
      $.blockUI({ 
        message: "<h3>Sorry, you cannot add more than 25. <br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }
  });
  $(document).on("click", '#clientpluginsAddMore', function() {
    if(counts["clientpluginsRemoveCount"] < 10) {
      var clientpluginscontent = '<div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm clientpluginsName required"   placeholder="e.g. Flash, Active-X, etc." maxlength="50"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm clientpluginsPurpose required"   placeholder="e.g. viewing documents" maxlength="100"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs clientpluginsRemove" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove</button></div></div>';
      $(".clientpluginssection").append(clientpluginscontent);
      counts["clientpluginsRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '#webserversAddMore', function() {
    if(counts["webserversRemoveCount"] < 10) {
      var webserverpluginscontent = '<div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm webserverpluginsName required"   placeholder="e.g. websphere, weblogic, etc" maxlength="50"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm webserverpluginsPurpose required"   placeholder="e.g. uploading documents" maxlength="100"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs webserversRemove" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove</button></div></div>';
      $(".webserverpluginssection").append(webserverpluginscontent);
      counts["webserversRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '#appServersAdd' ,function() {
    if(counts["appServersRemoveCount"] < 3) {
      var appServersContent = '<div class="row"><div class="col-md-2"><input type="text" class="form-control input-sm required appservertype"   placeholder="Server Type"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><input type="text" class="form-control input-sm required appserverversion"   placeholder="Server Version"><div class="errorMessage content-hide">This should not be empty</div></div> <div class="col-md-2"><input type="text" class="form-control input-sm required appserverbittype"   placeholder="Server Bit Type" maxlength="2"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><input type="text" class="form-control input-sm required ostype"   placeholder="OS Type/Version"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><input type="text" class="form-control input-sm required osbit"   placeholder="OS Bit" maxlength="2"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><input type="text" class="form-control input-sm required processor"   placeholder="Proccessor"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs appServersRemove"><span class="glyphicon glyphicon-minus " aria-hidden="true"></span> Remove</button></div></div>';
        $(this).parents(".appserverversionsection").append(appServersContent);
        counts["appServersRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 3.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '#policyURIPatternsAddMore', function() {
    if(counts["policyURIPatternsRemoveCount"] < 10) {
      var policyURIPatternsContent = '<div class="row margin0"><div class="col-md-3 input-group"><input type="text" class="form-control input-sm protectedUrlUsers required hash"   placeholder="Should start with \'/\'"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2 input-group"><select   class="ssoKpWorkForce required" multiple="multiple"><option value="Active Employee">Active Employee</option><option value="Inactive Employee">Inactive Employee</option><option value="Termed Employee">Termed Employee</option><option value="Affiliate">Affiliate</option><option value="Temp">Temp</option><option value="Offshore Contractor">Offshore Contractor</option><option value="Vendor">Vendor</option><option value="External User">External User</option><option value="Contractor">Contractor</option><option value="Affiliate Provider">Affiliate Provider</option></select></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs policyURIPatternsRemove" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove</button></div></div> ';
      $(".policyURIPatterns").append(policyURIPatternsContent);
      $(".ssoKpWorkForce").multiselect({header: false});
      counts["policyURIPatternsRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '#protectedURIPatternsAddMore', function() {
    if(counts["protectedURIPatternsRemoveCount"] < 10) {
      var protectedURIPatternsContent = '<div class="row"><div class="col-md-3 input-group"><input type="text" class="form-control input-sm unProtectedUrls required hash"   placeholder="Should start with \'/\'"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs protectedURIPatternsRemove" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove</button></div></div> ';
      $(".protectedURIPatterns").append(protectedURIPatternsContent);
      counts["protectedURIPatternsRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '#ssoHeaderVariablesAddMore', function() {
   if(counts["ssoHeaderVariablesRemoveCount"] < 10) {
    var ssoHeaderVariablesContent = '<div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm headerAttrName required"   placeholder="" maxlength="50"></div><div class="col-md-3 input-group form-group"><select id="headerEntrName'+counts["ssoHeaderVariablesRemoveCount"]+'" name="headerEntrName'+counts["ssoHeaderVariablesRemoveCount"]+'" class="flexselect"><option value="kpNUID">kpNUID</option><option value="kpFirstName">kpFirstName</option><option value="kpLastName">kpLastName</option><option value="kpLegalName">kpLegalName</option><option value="kpWorkEmail">kpWorkEmail</option><option value="kpWorkPhone">kpWorkPhone</option></select></div><div class="col-md-2"><button type="button" class="btn btn-danger btn-xs ssoHeaderVariablesRemove" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove</button></div></div>';
    $(".ssoHeaderVariablesSection").find(".ssoHeaderVariablesExplain").before(ssoHeaderVariablesContent);
    $("select.flexselect").flexselect({
      allowMismatch: true,
      inputNameTransform:  function(name) { return "wsso_" + name; }
    });
    $("input[name='wsso_headerEntrName"+counts["ssoHeaderVariablesRemoveCount"]+"']").val('').addClass("required");
    counts["ssoHeaderVariablesRemoveCount"]++;
    }else {
        $.blockUI({ 
            message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '.portAdd' ,function() {
    if($(this).hasClass('forNonProd')) {
      var portCount = $(this).attr('count');
      portCount = parseInt(portCount)-1;
      counts["portRemoveNonProdCount"][portCount] = $(this).closest(".nonProdFields").find(".ipaddress").length;
      if(counts["portRemoveNonProdCount"][portCount] < 10) {
        var portAddContent = '<div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm required ipaddress"    placeholder="IP Address (eg:172.01.01.01)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><input type="text" class="form-control input-sm required hostname"    placeholder="Hostnames (eg:dev)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required fqdn"    placeholder="FQDN(eg:dev.kp.org)""><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required ports"    placeholder="Ports (eg:8080,8000)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><button type="button" class="btn btn-danger btn-xs forNonProd portRemoveNonProd" count="'+portCount+'"><span class="glyphicon glyphicon-minus " aria-hidden="true"></span> Remove</button></div></div>';
          $(this).parents(".portSection").append(portAddContent);
          counts["portRemoveNonProdCount"][portCount]++;
      }else {
          $.blockUI({ 
              message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
      }
    }else {
      if(counts["portRemoveProdCount"] < 10) {
        var portAddContent = '<div class="row"><div class="col-md-3"><input type="text" class="form-control input-sm required ipaddress"    placeholder="IP Address (eg:172.01.01.01)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-2"><input type="text" class="form-control input-sm required hostname"    placeholder="Hostnames (eg:dev)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required fqdn"    placeholder="FQDN(eg:dev.kp.org)""><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-3"><input type="text" class="form-control input-sm required ports"    placeholder="Ports (eg:8080,8000)"><div class="errorMessage content-hide">This should not be empty</div></div><div class="col-md-1"><button type="button" class="btn btn-danger btn-xs portRemoveProd"><span class="glyphicon glyphicon-minus " aria-hidden="true"></span> Remove</button></div></div>';
          $(this).parents(".portSection").append(portAddContent);
          counts["portRemoveProdCount"]++;
      }else {
          $.blockUI({ 
              message: "<h3>Sorry, you cannot add more than 10.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
      }
    }
  });
// Add More Button actions ends

// Remove Button actions 
  $(document).on("click", '.removeNonProdEnv' ,function(ee) {
    if(count > 1) {
      var pickerCountTemp = $(this).closest('.row').find('.date-picker').attr("count");

      $(this).parents(".nonProdFields").prev("h1").remove(); 
      $(this).parents(".nonProdFields").fadeOut('slow').remove(); 
      count--;
      $(".rows-count").html(count+" Non-Prod environment(s) added");

      var i = 1;
      $(".customNonProds").each(function(index, el) {
        $(this).html("Non-Prod Environment "+i);
        i++;
      });

      var j=1;
      $(".date-picker").each(function(index, el) {
        $(this).attr({
          count: j,
          name: 'customtime'+j,
          id: 'customtime'+j,
        });
        $(this).next('label').attr('for', 'customtime'+j);
        j++;

        if(parseInt($(this).attr("count")) >= pickerCountTemp) {
          $(this).val('');
          $(this).datepicker("destroy");
        }
      });

      $(".date-picker-prd").val('');
      $(".date-picker-prd").datepicker("destroy");
    }else {
      $(".rows-count").html(count+" Non-Prod environment is mandatory");
        $.blockUI({ 
            message: "<h3>Sorry, this cannot be removed, one Non-Prod environment is mandatory.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
  $(document).on("click", '.portRemoveNonProd, .portRemoveProd, .webserversRemove, .protectedURIPatternsRemove, .policyURIPatternsRemove, .ssoHeaderVariablesRemove, .customWebserverVersionRemove, .clientpluginsRemove, .appServersRemove' ,function() {
    $(this).parents(".row").fadeOut('slow').remove();
    var class_name = $(this).attr('class').split(' ');
    var class_name_length = class_name.length;
    class_name_length = class_name_length-1;
    class_name = class_name[class_name_length]+"Count";
    if($(this).hasClass('forNonProd')) {
      var portCount = $(this).attr('count');
      counts["portRemoveNonProdCount"][portCount]--;
    }else {
      counts[class_name]--;
    }
  });
// Remove Button actions ends

// code for radio button actions
  $(document).on("click", '#farmoptionsRadios2,#infrastructureOptionsRadios1,#ssoDefaultTimeOutRadiosRadios1,#ssoMaximumSessionTimeRadios2,#ssoSingleSignOutRadios2,#ssoInternetAccessRadios1,#infrastructureSSLOptionsRadios3,#ssoPolicyConfigureRadios1,#ssoHeaderVariables2,#subdomainradios1,#clientpluginradios1,#webserverradios1,#uniqueradios1,#ssoSamePoliciesRadios2,.wssoPolicyPrefixShow,.wssoLoadBalancerShow,#selfQA2' ,
    function() {
    $(this).closest(".inside-content").find(".content-hide:first").show().children(".form-control").addClass('required').val('');
    if($(this).attr("name") == "clientpluginradios") {
      $("#clientplugins1").addClass('required').val('');
      $("#clientpluginspurpose1").addClass('required').val('');
    }
    if($(this).attr("name") == "webserverradios") {
      $("#webservers1").addClass('required').val('');
      $("#webserverspurpose1").addClass('required').val('');
    }    
    if($(this).attr("name") == "selfQA") {
      $("#qaURL").addClass('required').val('');
      $("#qaRPM").addClass('required').val('');
    }    
    if($(this).hasClass('ssoHeaderVariablesOptions')) {
      $(".headerAttrName").addClass('required');
      // $(".headerVariablesExplain").addClass('required');
      $("input[name=wsso_headerEntrName]").val('').addClass("required");
    }
    if($(this).hasClass('wssoPolicyPrefixShow')) {
      $(this).closest(".inside-content").find(".content-hide:first").children(".form-control").addClass('hash');
    }
    if($(this).hasClass('ssoInternetAccessRadiosOptions')) {
      $(".ssoSamePoliciesRadiosOptions").addClass('required');
    }
  });
  $(document).on("click", '#farmoptionsRadios1,#infrastructureOptionsRadios2,#ssoDefaultTimeOutRadiosRadios2,#ssoMaximumSessionTimeRadios1,#ssoSingleSignOutRadios1,#ssoInternetAccessRadios2,#infrastructureSSLOptionsRadios1,#infrastructureSSLOptionsRadios2,#ssoPolicyConfigureRadios2,#ssoHeaderVariables1,#subdomainradios2,#clientpluginradios2,#webserverradios2,#uniqueradios2,#ssoSamePoliciesRadios1,.wssoPolicyPrefixHide,.wssoLoadBalancerHide,#selfQA1' ,
    function() {
      $(this).closest(".inside-content").find(".content-hide:first").hide().children(".form-control").removeClass('required');
      if($(this).attr("name") == "clientpluginradios") {
        $("#clientplugins1").removeClass('required');
        $("#clientpluginspurpose1").removeClass('required');
      }
      if($(this).attr("name") == "webserverradios") {
        $("#webservers1").removeClass('required');
        $("#webserverspurpose1").removeClass('required');
      }
      if($(this).attr("name") == "selfQA") {
        $("#qaURL").removeClass('required').val('');
        $("#qaRPM").removeClass('required').val('');
      }   
      if($(this).hasClass('ssoHeaderVariablesOptions')) {
        $(".headerAttrName").removeClass('required');
        // $(".headerVariablesExplain").removeClass('required');
        $(this).closest(".inside-content").find(".flexselect").removeClass('required');
      }
      if($(this).hasClass('wssoPolicyPrefixHide')) {
        $(this).closest(".inside-content").find(".content-hide:first").children(".form-control").removeClass('hash');
      }
      if($(this).hasClass('ssoInternetAccessRadiosOptions')) {
        $(".ssoSamePoliciesRadiosOptions").removeClass('required');
      }
  });
// code for radio button actions ends

// code for on fly validations
  $(document).on('focusout change keyup paste click', '.appBackendUrl', function(event) {
    if($.trim($(this).val()) != '') {
      if(httpsValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("URL should start with https://").show();
      }else if(kpValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
      }else if(urlValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid URL").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("optional field").hide();
      }
    }else {
      $(this).css({
        "border": "",
      });
      $(this).siblings('.errorMessage').html("optional field").hide();
    }
  });
  $(document).on('focusout change keyup paste click', '.required', function(event) {
    if($.trim($(this).val()) == '' && !($(this).hasClass('unProtectedUrls'))) {
      $(this).css({
        "border": "1px solid red",
      });
      $(this).siblings('.errorMessage').html("Mandatory field").show();
    }else if($(this).hasClass('appserverbittype') || $(this).hasClass('osbit')) {
      var thisValue = $.trim($(this).val());
      if(thisValue != '32' && thisValue != '64') {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid Bit (32/64)").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('hash')) {
      if(hashValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid pattern. It must start with forward slash '/'.").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('alphanumeric')) {
      if(alphaNumericValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Should only contain alphabets (a-z/A-Z), numbers (0-9).").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('lowercase')) {
      if(lowercaseValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Should only contain lower case alphabets (a-z), numbers (0-9), underscore (_), hyphen (-), dot (.).").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('url')) {
      if(httpsValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("URL should start with https://").show();
      }else if(kpValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
      }else if(urlValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid URL").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('ipaddress')) {
      if(ipaddressValidation($.trim($(this).val())) == false) {
        $(this).css({
        "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a IP Address").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('hostname')) {
      if(hostnameValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid Hostname").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('fqdn')) {
      if(kpValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
      }else if(fqdnValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid FQDN").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('ports')) {
      if(portValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Not a valid Port").show();
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('number')) {
      if(numberValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("This must be a number").show();
        $(this).val('');
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else if($(this).hasClass('sessionnumber')) {
      if(numberValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("This must be a number").show();
        $(this).val('');
      }else if(sessionNumberValidation($.trim($(this).val())) == false) {
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Hours should be between 1 and 13.").show();
        $(this).val('');
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    }else {
      $(this).css({
        "border": "",
      });
      $(this).siblings('.errorMessage').html("Mandatory field").hide();
    }
  });
  $(document).on('click', 'input:radio', function(event) {
    var thisName = $(this).attr("name");  
    if($('input[name='+thisName+']:checked').val()) {
      $('input[name='+thisName+']:checked').closest(".radio").children('label').css({"color":"#333"});
      // selected
    }else  {
      $('input[name='+thisName+']').parent("label").css({"color":"red"});
      // not selected
    }
  });
// code for on fly validations ends

// test cases file upload and delete code
  // $(document).on('click', '.uploadTestResultsUpload', function(event) {
  $("#uploadTestResultsFile").on("change", function() {
    var files = document.getElementById('uploadTestResultsFile').files;
    if(files.length == 0){
      $.blockUI({ 
        message: "<h3>Please select files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }else {  
      if(testResultsCount && testResultsCount >9) {
        $('#uploadTestResultsFile').val('');
        $.blockUI({ 
          message: "<h3>You cannot upload more than 10 files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
        return false;
      }      
      if(testResultsNames.indexOf(files[0].name) >= 0) {
          if (confirm("You have already chosen this file, still want to continue ?") == false) {
              $('#uploadTestResultsFile').val('');
              return false;
          }
      }
      var file = new FormData();
      var fileInfo = document.getElementById('uploadTestResultsFile').files;
      var parts = fileInfo[0].name.split('.');
      var ext = parts[parts.length-1];
        
      if(ext.toLowerCase() != 'xls' && ext.toLowerCase() != 'xlsx' && ext.toLowerCase() != 'doc' && ext.toLowerCase() != 'docx' && ext.toLowerCase() != 'pdf' && ext.toLowerCase() != 'ppt'&& ext.toLowerCase() != 'pptx' && ext.toLowerCase() != 'jpg' && ext.toLowerCase() != 'jpeg' && ext.toLowerCase() != 'png') {            
          $.blockUI({ 
            message: "<h3>Please upload only .xls,.xlsx,.jpg,.png,.doc,.pdf,.docx,.pptx,.ppt files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
          return false;
      }
      if(fileInfo[0].size > 5*1024*1024) {
          $.blockUI({ 
            message: "<h3>Maximum file limit is 5MB, "+fileInfo[0].name+" exceeded it !<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
          return false;
      }
      testResultsNames.push(fileInfo[0].name);
      file.append('file',fileInfo[0]);  
      file.append('type','testresult');
      file.append('intgId',intgId);
      file.append('tro',troNum);
      var filepath = $('#uploadTestResultsFile').val();
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
      });
      $.ajax({
        url: domainPath+"wssoFileUpload",
        type: "POST",
        data: file,
        dataType: 'text',
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        success: function(response) {
          response = jQuery.parseJSON(response);
          if(response.success == true) {
            $(response.records).each(function (k,v) { 
              if(v) {
                var uploadedTestResults = '<div class="row uploadedTestResultsDiv"><div class="col-md-6 downloadLinkForTestResults"><a href="'+domainPath+"download?fileName="+v+"&intgId="+intgId+"&tro="+troNum+"&type=testresult"+'" class="" target="_BLANK">'+fileInfo[0].name +'</a></div><div class="col-md-3"><button type="button" class="btn btn-danger btn-xs deleteUploadedTestResult" filename="'+fileInfo[0].name +'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button></div></div>';
                $(".uploadedTestResultsFieldset").append(uploadedTestResults);      
                $('#uploadTestResultsFile').val('');
                testResultsCount++;
              }else {
                  $.blockUI({ 
                    message: tempFiles[k]+" File upload failed, please try again !<br><br><button type='button' class='btn btn-primary closeError'>OK</button>", 
                  });
              }
            });
            $.unblockUI();
          }else {
            $.blockUI({ 
            message: "<h3>File upload failed, please try again.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
          }
        },
        error: function(e) {
          $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
          });
        }
      });
    }
  });
  $(document).on('click', '.deleteUploadedTestResult', function(event) {
    if(testResultsCount) {
      var thisFile = $(this).attr("filename");  
      var thisValue = $(this);
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
      });
      var thisURL = domainPath+"wssoDeleteUploadFiles?fileName="+thisFile+"&intgId="+intgId+"&tro="+troNum+"&type=testresult";
      $.ajax({
          url: thisURL,
          type: "POST",
          data: '',
          contentType: "application/json",        
          success: function(response) {          
            if(response.success == true) {
                thisValue.closest('.uploadedTestResultsDiv').fadeOut('slow').remove();
                testResultsCount--;
                testResultsNames.splice(testResultsNames.indexOf($(this).attr('filename')),1);
                $.unblockUI();
            }else {
              $.blockUI({ 
              message: "<h3>Delete failed: " + response.message+"<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
              });
            }
          },
          error: function(e) {
            $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
      });
    }else {
      $.blockUI({ 
      message: "<h3>No data to delete!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }
  });
// test cases file upload and delete code ends
 
  
// code for submit test result
  $(document).on('click', '.submitTestResultsUpload', function(event) {
    if(testResultsCount) {
        $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
        });
        $.ajax({
          url: domainPath+"wssoSaveTestResults",
          type: "POST",
          data: JSON.stringify({testResultsFile:testResultsNames,intgId:intgId,tro:troNum}),
          contentType: "application/json",        
          success: function(response) {  
            if(response.success == true){
                $.blockUI({ 
                    message: "<h3>Test results submitted successfully! <br><br><button type='button' class='btn btn-primary closePage'>OK</button></h3>", 
                  });         
            } else {
              $.blockUI({ 
                    message: "<h3>Test result saving failed: " + response.message+".<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
                  }); 
            } 
          },
          error: function(e) {
            $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
            });
          }
        });
    }else {
       $.blockUI({ 
          message: "<h3>Please browse files then submit!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
        });
    }
  });
// code for submit test result ends

// certificate file upload and delete code
  // $(document).on('click', '.uploadZipFileAction', function(event) {
  $(".uploadZipFile").on("change", function() {
    var count = $(this).attr("count");
    var appDomainId = $(this).attr("appDomainId");
    var appDomain = $(this).attr("appDomain");
    // var thisButton = $(this);
    var fileInfo = document.getElementById('uploadZipFile'+count).files;
    if(fileInfo.length == 0){
      $.blockUI({ 
        message: "<h3>Please select files!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
      });
    }else {   
      var file = new FormData();
      var parts = fileInfo[0].name.split('.');
      var ext = parts[parts.length-1];
        
    //  if(isWebgate == 'N') {
          if(ext.toLowerCase() != 'zip') {
            $.blockUI({ 
              message: "<h3>Please upload only .zip file!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
            return false;
          }
      /*}else if(isWebgate == 'Y') {
          if(ext.toLowerCase() != 'pem') {
            $.blockUI({ 
              message: "<h3>Please upload only .pem file for webgate integration!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
            return false;
          }
      }*/            
      if(fileInfo[0].size > 10*1024*1024) {
          $.blockUI({ 
            message: "<h3>Maximum file limit is 10MB, "+fileInfo[0].name+" exceeded it !<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
          });
          return false;
      }
      file.append('file',fileInfo[0]);  
      file.append('type','certificate');
      file.append('appDomain',appDomain);
      file.append('appDomainId',appDomainId);
      file.append('tro',troNum);
      file.append('formType', isWebgate);
      
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait!</h3>", 
      });
      $.ajax({
        url: domainPath+"wssoFileUpload",
        type: "POST",
        data: file,
        dataType: 'text',
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        success: function(response) {
          response = jQuery.parseJSON(response);
          if(response.success == true) {
            $(response.records).each(function (k,v) { 
              if(v) {
                var uploadedZipResult = '<div class="row uploadedZipDiv"><div class="col-md-7 downloadLinkZipResult"><a href="'+domainPath+"download?fileName="+v+"&intgId="+intgId+"&tro="+troNum+"&type=certificate"+'" class="btn btn-primary btn-sm" target="_BLANK"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Download '+fileInfo[0].name +'</a></div><div class="col-md-3 content-hide"><button type="button" class="btn btn-danger btn-xs deleteUploadedZip" filename="'+v+'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button></div></div>';
                $(".uploadedZipFieldset"+count).show().html(uploadedZipResult);      
                $('#uploadZipFile'+count).val('').parent().parent().hide();
                // thisButton.parent().hide();  
              }else {
                $.blockUI({ 
                  message: fileInfo[0].name+" File upload failed, please try again !<br><br><button type='button' class='btn btn-primary closeError'>OK</button>", 
                });
                $('#uploadZipFile'+count).val('');
              }
            });
            $.unblockUI();
          }else {
            $.blockUI({ 
              message: "<h3>File upload failed, please try again !<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>", 
            });
            $('#uploadZipFile'+count).val('');
          }
        },
        error: function(e) {
          $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
          });
          $('#uploadZipFile'+count).val('');
        }
      });
    }
  });
// certificate file upload and delete code ends

// function definitions  
  function fqdnValidation(hostname) {  
    if(/^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i.test(hostname)) {   
      return true;
    } else {
      return false;
    }
  } 
  function alphaNumericValidation(alphanumeric) {    
    var pattern = /^([a-zA-Z0-9])*$/;
    if(pattern.test(alphanumeric)) {
      return true;
    } else {
      return false;
    }
  } 
  function lowercaseValidation(lowercase) {    
    var pattern = /^([a-z0-9\-\_\.])*$/;
    if(pattern.test(lowercase)) {
      return true;
    } else {
      return false;
    }
  } 
  function hostnameValidation(hostname) {    
    var pattern = /^([a-zA-Z0-9\-\.])*$/;
    if(pattern.test(hostname)) {
      return true;
    } else {
      return false;
    }
  } 
  function ipaddressValidation(ipaddress) {  
   if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) { 
      return true;
    } else {
      return false;
    }
  }
  function hashValidation(hash) {
    if(hash && hash.indexOf("/") != 0) {
      return false;
    }else {
      return true;
    }
  }
  function httpsValidation(url) {
    if(url.indexOf("https://") > -1) {
      return true;
    }else {
      return false;
    }
  }
  function kpValidation(url) {
    if(url.indexOf("kp.org") > -1) {
      return true;
    }else {
      return false;
    }
  }
  function urlValidation(url) {
    //var Regex=/^(https\:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.\w{2,3})?([^a-zA-Z0-9]|[a-zA-Z0-9])?$/; //works till /, no query params.
    //var Regex=  /^(https\:\/\/)(www\.)?([a-zA-Z0-9-]+\.)?kp\.org(\/.*)?$/; // another workaround
    // var Regex = /^(https\:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z0-9-]{2,3})\/?([a-zA-Z0-9\_\-\/\?\.\,\*\+\(\)\[\]\=\&]+)?$/;
    var Regex = /^(https\:\/\/)(www\.)?(([a-zA-Z0-9-]+\.)+)?kp\.org(.*)?$/;
    if(Regex.test(url)) {
      return true;
    }else { 
      return false;
    }
  }
  function portValidation(ports) {    
    // var pattern = /^[1-9]{1}$|^[0-9]{2,4}$|^[0-9]{3,4}$|^[1-5]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$|^[1-6]{1}[0-4]{1}[0-9]{1}[0-9]{1}[0-9]{1}$|^[1-6]{1}[0-5]{1}[0-4]{1}[0-9]{1}[0-9]{1}$|^[1-6]{1}[0-5]{1}[0-5]{1}[0-3]{1}[0-5]{1}$/;
    var pattern = /^((6553[0-5]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3}),)*(6553[0-5]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/ ;
    if (ports.match(/[a-zA-Z]/i)) {
      return false;
    }else if(pattern.test(ports)){
      return true;
    }else {
      return false;
    }
  }
  function numberValidation(number) {    
    var Regex = /^[0-9]\d*$/;
    if(Regex.test(number)){
      return true;
    }else {
      return false;
    }
  }
  function sessionNumberValidation(number) {    
    var Regex = /^[1-9]$|^1[0-3]$/;
    if(Regex.test(number)){
      return true;
    }else {
      return false;
    }
  }
  function extractDomain(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    else {
      return null;
    }
  }
  function prodNonProdUrlCheck() {
    var response = true;
    var endUserUrlP = extractDomain($(".endUserUrlP").val());
    if(endUserUrlP) {
      $(".endUserUrl").each(function(i,j) {
        var thisValue = extractDomain($(this).val());
        if(thisValue && (endUserUrlP == thisValue)) {
         response = false;
        }
      });
    }
    return response;
  }
  function nonProdEnvCheckFunction() {
    var response = true;
    var nonProdNames= [];
    $(".custom-name").each(function(i,j) {
      if($.trim($(this).val()) != '') {
        if(nonProdNames.indexOf($(this).val().toLowerCase()) < 0) {
          nonProdNames.push($(this).val().toLowerCase());
        }else {
          response = false;
        }
      }
    });
    return response;
  }
  function datepickerCheckFunction() {
    var response = true;
    var lastPRDDate = $(".date-picker-prd").val();

    $(".date-picker").each(function(ind, el) {
      var lastDate = $(this).val();
      var envCount = $(this).attr("count");
      if(lastDate) {
        var lastDateParts = lastDate.split('/'); 
        var newDate = new Date(lastDateParts[2],lastDateParts[0]-1,lastDateParts[1]); 
        var todayDate = new Date();
        if (todayDate.getTime() > newDate.getTime()) {
              $.blockUI({ 
                  message: "<h3>Non-Prod Environment "+envCount+"\'s date should not be lesser than today's date.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
              });
              response = false;
              return response;
        }
      }
    });

    if(response) {
      if(lastPRDDate) {
        var lastPRDDateParts = lastPRDDate.split('/'); 
        var newPRDDate = new Date(lastPRDDateParts[2],lastPRDDateParts[0]-1,lastPRDDateParts[1]); 
        var todayPRDDate = new Date();
        if (todayPRDDate.getTime() > newPRDDate.getTime()) {
              $.blockUI({ 
                  message: "<h3>Prod Environment's date should not be lesser than today's date.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
              });
              response = false;
              return response;
        }
      }
    }
    return response;
  }
  function protectedNonProtectedURLCheckFunction() {
    var response = true;
    var URLNames= [];
    $(".protectedUrlUsers").each(function(i,j) {
      if($.trim($(this).val()) != '') {
        if(URLNames.indexOf($(this).val().toLowerCase()) < 0) {
          URLNames.push($(this).val().toLowerCase());
        }else {
          response = false;
        }
      }
    });
    $(".unProtectedUrls").each(function(i,j) {
      if($.trim($(this).val()) != '') {
        if(URLNames.indexOf($(this).val().toLowerCase()) < 0) {
          URLNames.push($(this).val().toLowerCase());
        }else {
          response = false;
        }
      }
    });
    return response;
  }
  function getFormModel() {
    var model = {};
    var formData = {};
    $("#mainform").serializeArray().map(function(x){formData[x.name] = x.value;});
    model.id = wssoId;
    model.intId = intgId;
    model.webBrowser = (formData.infrastructureOptionsRadios == 'Yes')?formData.infrastructureOptionsText:'';

    model.ssltlsRadio = (formData.ssltlsRadios == 'Yes')?'Y':'';
    
    model.sslOptionsTxt = (formData.infrastructureSSLOptionsRadios == 'option3')?formData.infrastructureSSLOptionsText:formData.infrastructureSSLOptionsRadios;
    model.otherAppsWssoProtected = (formData.subdomainradios == 'Yes')?formData.subdomainradiosText:'';  

    model.embeddedFrames = (formData.embeddedframesradios == 'Yes')?'Y':'';
    model.clientPlugins   = [];
    if(formData.clientpluginradios == "Yes") {
      var clientPluginList = [];
      $('.clientpluginsName').each(function() {
        clientPluginList.push({"key":$(this).val(),"value":$(this).parents('.row').find('.clientpluginsPurpose').val()});
      });
      model.clientPlugins   = clientPluginList;
    }
    model.webServerPlugins   = [];
    if(formData.webserverradios == "Yes") {
      var webServerPluginsList = [];
      $('.webserverpluginsName').each(function() {
        webServerPluginsList.push({"key":$(this).val(),"value":$(this).parents('.row').find('.webserverpluginsPurpose').val()});
      });
      model.webServerPlugins   = webServerPluginsList;
    }
    
    model.webServerVersionList = {};
    if($("#webserverversion").val() && $("#webserverversion").val() != 'None of the above' ) {
    model.webServerVersionList.serverVersion = ($("#webserverversion").val())?$("#webserverversion").val():"";
    model.webServerVersionList.serverBitType = ($("#webServerBitMode").val())?$("#webServerBitMode").val():"";
    model.webServerVersionList.serverOSVersion = ($("#osVersion").val())?$("#osVersion").val():"";
    model.webServerVersionList.serverOSBitType = ($("#osBitMode").val())?$("#osBitMode").val():"";
    model.webServerVersionList.process = ($("#processorType").val())?$("#processorType").val():"";
      model.webServerVersionList.serverType = false;
    }else if($("#webserverversion").val() == 'None of the above' ){
      model.webServerVersionList.serverVersion = $("#webserverversionText").val();
      model.webServerVersionList.serverBitType = $("#webServerBitModeText").val();
      model.webServerVersionList.serverOSVersion = $("#osVersionText").val();
      model.webServerVersionList.serverOSBitType = $("#osBitModeText").val();
      model.webServerVersionList.process = $("#processorTypeText").val();
      model.webServerVersionList.serverType = true;
    } else {
      model.webServerVersionList.serverVersion = "";
        model.webServerVersionList.serverBitType = "";
        model.webServerVersionList.serverOSVersion = "";
        model.webServerVersionList.serverOSBitType = "";
        model.webServerVersionList.process = "";
        model.webServerVersionList.serverType = false;
    }
    
    var appserverversionList = [];
    $(".appservertype").each(function() {
      var list = {};
      list.serverType = $(this).val();
      list.serverVersion = $(this).parents(".row").find(".appserverversion").val();
      list.serverBitType = $(this).parents(".row").find(".appserverbittype").val();
      list.serverOSVersion = $(this).parents(".row").find(".ostype").val();
      list.serverOSBitType = $(this).parents(".row").find(".osbit").val();
      list.process = $(this).parents(".row").find(".processor").val();
      appserverversionList.push(list);
    });
    model.appserverversionList  = appserverversionList;
    model.diagramFiles  = diagramFiles;
    model.webServerManager  = formData.appownerradios;
    model.additionalComments = (formData.uniqueradios == 'Yes')?formData.uniquerequirementExplain:'';
    model.aimsID = formData.AIMSID;
    model.rpmCode = formData.RPMCode;


    // second tab data capture
    model.peakUserBase = parseInt(formData.peakUserBase);
    model.peakConcurrentUsers = parseInt(formData.concurrentUsers);
    model.testUsers = formData.testUsers;
    model.contractUsers = formData.contractUsers;

    model.sessionTimeOut  = (formData.ssoDefaultTimeOutRadios == 'Yes')?formData.ssoDefaultTimeOutRadiosText:'';
    model.maxSessionTime  = (formData.ssoMaximumSessionTimeRadios == 'No')?formData.ssoMaximumSessionTimeRadiosText:'';

    model.singleSignOut  = (formData.ssoSingleSignOutRadios == 'No')?formData.ssoSingleSignOutRadiosText:'';
    model.oamIdentifier  = formData.ssoMnemonic;

    var protectedUrlUsersList = [];
    $('.protectedUrlUsers').each(function() {

      protectedUrlUsersList.push({"key":$(this).val(),"value":($(this).parents('.row').find('.ssoKpWorkForce').val())?$(this).parents('.row').find('.ssoKpWorkForce').val().toString():''});
    });
    model.protectedUrlUsers  = protectedUrlUsersList;
    model.urlUserRestrictions  = formData.policyURIPatternsText;
    
    var unProtectedUrlsList = [];
    $('.unProtectedUrls').each(function() {
      unProtectedUrlsList.push({"key":"unProtectedUrls","value":$(this).val()});
    }); 
    model.unProtectedUrls  = unProtectedUrlsList;


    var headerVariablesList = [];
    if(formData.ssoHeaderVariables == 'NonDefault') {
      $('.headerAttrName').each(function() {
        headerVariablesList.push({"key":$(this).val(),"value":$(this).parents('.row').find('.flexselect').val()});
      });
      model.headerVariables  = formData.headerVariablesExplain;
    }
    model.headerVariableList  = headerVariablesList;

    model.accessFromInternet  = 'No';
    if(formData.ssoInternetAccessRadios == "Yes" && formData.ssoSamePoliciesRadios == "No") {
      model.accessFromInternet  = 'Yes|'+formData.ssoSamePoliciesText;
    } else if(formData.ssoInternetAccessRadios == "Yes" && formData.ssoSamePoliciesRadios == "Yes"){
      model.accessFromInternet  = 'Yes';
    }
    
    model.splPolicyConfiguration = (formData.ssoPolicyConfigureRadios == 'Yes')?formData.ssoPolicyConfigureText:'';
    // third tab data capture
    var envDetails = [];
    // non prod data
    $(".nonProdFields").each(function() {
      var nonProdFormData = {};
      nonProdFormData.id = $(this).find(".envId").val();
      nonProdFormData.envName = $(this).find(".custom-name").val();
      var d = $(this).find(".date-picker").val();
      var dateString = '';
      if(d) {
        var tempDate = d.split('/');
        dateString = tempDate[2]+"-"+tempDate[0]+"-"+tempDate[1];
      }
      nonProdFormData.envDate = dateString;
      nonProdFormData.endUserUrl = $(this).find(".endUserUrl").val();
      nonProdFormData.endUserUrlCheck = ($(this).find(".endUserUrlCheck").is(':checked'))?'Y':'N';
      nonProdFormData.appBackendUrl = $(this).find(".appBackendUrl").val();
      nonProdFormData.prefix =  ($(this).find("input:radio.wssoPolicyPrefix:checked").val() == 'Yes')?$(this).find(".wssoPolicyPrefixText").val():'';
      nonProdFormData.healthCheckUrl =  ($(this).find("input:radio.wssoLoadBalancer:checked").val() == 'Yes')?$(this).find(".wssoLoadBalancerText").val():'';
      var configList = [];
      $(this).find(".ipaddress").each(function() {
        var list = {};
        list.ipAddress = $(this).val();
        list.host = $(this).parents(".row").find(".hostname").val();
        list.fqdn = $(this).parents(".row").find(".fqdn").val();
        list.port = $(this).parents(".row").find(".ports").val();
        configList.push(list);
      });
      nonProdFormData.urlAddress = configList;
      envDetails.push(nonProdFormData);
    });
    // prod data
    $(".prodFields").each(function() {
      var prodFormData = {};
      prodFormData.id = $(this).find(".envId").val();
      prodFormData.envName = "prod";
      var d = $(this).find(".date-picker-prd").val();
      var dateString = '';
      if(d) {
        console.log(d);
        var tempDate = d.split('/');
        dateString = tempDate[2]+"-"+tempDate[0]+"-"+tempDate[1];   
      }
      
      prodFormData.envDate = dateString;
      prodFormData.endUserUrl = $(this).find(".endUserUrlP").val();
      prodFormData.endUserUrlCheck = ($(this).find(".endUserUrlCheck").is(':checked'))?'Y':'N';
      prodFormData.appBackendUrl = $(this).find(".appBackendUrl").val();
      prodFormData.prefix =  ($(this).find("input:radio.wssoPolicyPrefixP:checked").val() == 'Yes')?$(this).find(".wssoPolicyPrefixText").val():'';
      prodFormData.healthCheckUrl =  ($(this).find("input:radio.wssoLoadBalancerP:checked").val() == 'Yes')?$(this).find(".wssoLoadBalancerText").val():'';
      var configList = [];
      $(this).find(".ipaddress").each(function() {
        var list = {};
        list.ipAddress = $(this).val();
        list.host = $(this).parents(".row").find(".hostname").val();
        list.fqdn = $(this).parents(".row").find(".fqdn").val();
        list.port = $(this).parents(".row").find(".ports").val();
        configList.push(list);
      });
      prodFormData.urlAddress = configList;
      envDetails.push(prodFormData);
    });
    model.envDetails = envDetails;
    
    model.qaRequirement = '';
    if(formData.selfQA == 'No') {
        model.qaRequirement = 'No|'+formData.qaURL+'|'+formData.qaRPM;
      }
    
    model.reverseProxy = (formData.farmoptionsRadios == 'No')?formData.farmoptionsExplain:'';
    model = JSON.stringify(model);
    return model;
  }

  // code for UI validations
  function getValidations() {
    var isValid = true;
    var allradios = []; 
    $('input[type="text"].required').each(function() {
      if ($.trim($(this).val()) == '' && !($(this).hasClass('unProtectedUrls'))) {
        isValid = false;
        $(this).css({
          "border": "1px solid red",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").show();
      }else {
        $(this).css({
          "border": "1px solid red",
        });
        if($(this).hasClass('appserverbittype') || $(this).hasClass('osbit')) {
          var thisValue = $.trim($(this).val());
          var thisElem = $(this);
          if(thisValue != '32' && thisValue != '64') {
            isValid = false;  
            thisElem.siblings('.errorMessage').html("Not a valid Bit (32/64)").show();
          }else {
            $(this).css({
                "border": "",
            });
            thisElem.siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('hash')) {
          if(hashValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid pattern. It must start with forward slash '/'.").show();
          }else {
            $(this).css({
                "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('alphanumeric')) {
          if(alphaNumericValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Should only contain alphabets (a-z/A-Z), numbers (0-9).").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('lowercase')) {
          if(lowercaseValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Should only contain lower case alphabets (a-z), numbers (0-9), underscore (_), hyphen (-), dot (.).").show();
          }else {
            $(this).css({
                "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('url')) {
          if(httpsValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("URL should start with https://").show();
          }else if(kpValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
          }else if(urlValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid URL").show();
          }else {
            $(this).css({
                "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('ipaddress')) {
          if(ipaddressValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid IP Address").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('hostname')) {
          if(hostnameValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid Host Name").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('fqdn')) {
          if(kpValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
          }else if(fqdnValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid FQDN").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('ports')) {
          if(portValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("Not a valid Port").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          } 
        }else if($(this).hasClass('number')) {
          if(numberValidation($.trim($(this).val())) == false) {
            isValid = false;  
            $(this).siblings('.errorMessage').html("This must be a number").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else if($(this).hasClass('sessionnumber')) {
          if(numberValidation($.trim($(this).val())) == false) {
            isValid = false; 
            $(this).siblings('.errorMessage').html("This must be a number").show();
          }else if(sessionNumberValidation($.trim($(this).val())) == false) {
            isValid = false; 
            $(this).siblings('.errorMessage').html("Hours should be between 1 and 13.").show();
          }else {
            $(this).css({
              "border": "",
            });
            $(this).siblings('.errorMessage').html("Mandatory field").hide();
          }
        }else {
          $(this).css({
              "border": "",
          });
          $(this).siblings('.errorMessage').hide();
        }
      }
    });
    
    $('.appBackendUrl').each(function() {
      if($.trim($(this).val()) != '') {
        if(httpsValidation($.trim($(this).val())) == false) {
          isValid = false;  
          $(this).css({
            "border": "1px solid red",
          });
          $(this).siblings('.errorMessage').html("URL should start with https://").show();
        }else if(kpValidation($.trim($(this).val())) == false) {
          isValid = false;  
          $(this).css({
            "border": "1px solid red",
          });
          $(this).siblings('.errorMessage').html("Domain always ends with kp.org").show();
        }else if(urlValidation($.trim($(this).val())) == false) {
          isValid = false;  
          $(this).css({
            "border": "1px solid red",
          });
          $(this).siblings('.errorMessage').html("Not a valid URL").show();
        }else {
          $(this).css({
            "border": "",
          });
          $(this).siblings('.errorMessage').html("optional field").hide();
        }
      }else {
        $(this).css({
          "border": "",
        });
        $(this).siblings('.errorMessage').html("optional field").hide();
      }
    });

    $('textarea.required').each(function() {
      $(this).css({
        "border": "1px solid red",
      });
      $(this).siblings('.errorMessage').html("Mandatory field").show();
      if ($.trim($(this).val()) == '') {
        isValid = false;  
      }else {
        $(this).css({
            "border": "",
        });
        $(this).siblings('.errorMessage').html("Mandatory field").hide();
      }
    });

    $('select.required').each(function() {
      $(this).css({
        "border": "1px solid red",
      });
      if ($(this).val() == '') {
        isValid = false;  
      }else {
        $(this).css({
          "border": "",
        });
      }
    });
    $('select.ssoKpWorkForce').each(function() {
      $(this).siblings('.ui-multiselect ').css({
        "border": "1px solid red",
      });
      var thisValue = $(this).val();
      if (thisValue) {
        $(this).siblings('.ui-multiselect ').css({
          "border": "",
        });
      }else {
        isValid = false;  
      }
    });

    $('input:radio.required').each(function() { 
      if(allradios.indexOf($(this).attr("name")) < 0) 
          allradios.push($(this).attr("name")); 
    });

    $(allradios).each(function(index, el) {
      if($('input[name='+el+']:checked').val()) {
        $('input[name='+el+']:checked').closest(".radio").children('label').css({"color":"green"});
        // selected
      }else  {
        $('input[name='+el+']').parent("label").css({"color":"red"});
        // not selected
        isValid = false;
      }
    });

    if(!diagramFilesCount) {
      $(".myLabel:first").css({
        "border": "1px solid red"
      });
      isValid = false;  
    }else {
      $(".myLabel:first").css({
        "border": ""
      });
    }
    return isValid;
  }
// function definitions ends

// form approve
  $("#approve,#approveTestResults").on('click', function(event) {
    event.preventDefault();  
    if((status == "Business Engagement Approved") && ($(".date-picker").length > 5)) {
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Sending data to server, this will take few minutes!</h3>", 
      });
    }else {
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Sending data to server, this won't take much time!</h3>", 
      });
    }
    var postData = "intgId="+intgId;
    $.ajax({
      url: domainPath+"approveWSSO",
      type: "POST",
      data: postData,
      dataType: "json",
      /*contentType: "application/json",*/
      success: function(approvedata) {
        if(approvedata.success == true) {
          $.blockUI({ 
            message: "<h3>Form approved successfully!<br><br><button type='button' class='btn btn-primary closePage'>OK</button></h3>", 
          });
        }else {
          $.blockUI({ 
            message : "<h3>Form approval failed for " + appName + ". " + approvedata.message + "<br><br><button type='button' class='btn btn-primary closePage'>OK</button></h3>"
          });
        }
      },
      error: function(e) {
        $.blockUI({ 
          message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>"
        });
      }
    });
  });
// form approve ends  

// form reject
  $("#reject,#rejectTestResults").on('click', function(event) {
    event.preventDefault();  
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var showText = "<div class='rejectDiv'><h3>Are you sure you want to reject this integration?</h3><hr><br>";
    showText += "<textarea class='form-control content-hide rejectJustify' rows='3' id='' name='' placeholder='If Yes, Please justify the reason' maxlength='500'></textarea><br>";
    showText += "<div class='rejectActionButtons'><button type='button' class='btn btn-primary rejectYes' id=''>Yes</button>  <button type='button' class='btn btn-danger rejectNo'>No</button></div>";
    showText += "<div class='rejectSubmitButtons content-hide'><button type='button' class='btn btn-primary rejectSubmit' id=''>Submit</button>  <button type='button' class='btn btn-danger rejectCancel'>Cancel</button></div></div>";
    $.blockUI({ 
      message: showText, 
    }); 
  });
  $(document).on('click', '.rejectYes', function(event) {
    $(this).closest('.rejectDiv').find(".rejectJustify").show();
    $(this).closest('.rejectDiv').find(".rejectActionButtons").hide();
    $(this).closest('.rejectDiv').find(".rejectSubmitButtons").show();
  });
  $(document).on('click', '.rejectSubmit', function(event) {
    var justifyValue = $(this).closest('.rejectDiv').find(".rejectJustify").val();
    if(!justifyValue) {
      alert("Please justify the reject reason.");
    }else {
      event.preventDefault();  
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Please wait...!</h3>", 
      });
      var rejecturl=domainPath+"rejectTask?intgId="+intgId+"&status="+status+"&rejectJustification="+justifyValue;
      console.log(rejecturl);
      $.ajax({
        url: rejecturl,
        type: "POST",
        data: '',
        contentType: "application/json",
        success: function(rejectdata) {
          if(rejectdata == true) {
            $.blockUI({ 
              message: "<h3>"+appName+" Integration is rejected! <br><br><button type='button' class='btn btn-primary closePage'>OK</button></h3>", 
            });
          }else {
            $.blockUI({ 
              message: "<h3>Problem while Rejecting the "+appName+" Integration!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
            });
          }
        },
        error: function(e) {
          $.blockUI({ 
            message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>"
          });
        }
      });
    }
  });
// form reject ends  

//form save area
 $(document).on('click', '.formSave', function(event) {
    var prodURLCheck = prodNonProdUrlCheck();
    var nonProdEnvCheck = nonProdEnvCheckFunction();
    var datepickerCheck = datepickerCheckFunction();
    var protectedNonProtectedURLCheck = protectedNonProtectedURLCheckFunction();
    if(prodURLCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".endUserUrlP").focus();
        $.blockUI({ 
            message: "<h3>Non Prod and Prod end user URLs must not be the same.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else if(nonProdEnvCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
        $.blockUI({ 
            message: "<h3>Duplicate Non Prod Environment names found.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else if(datepickerCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
    }else if(protectedNonProtectedURLCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 1);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
        $.blockUI({ 
            message: "<h3>Duplicate protected/un-protected URIs found.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else {
      event.preventDefault();  
      var model = getFormModel();
      $.blockUI({ 
        message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Saving data to server, this won't take much time!</h3>"
      });
      $.ajax({
       url: domainPath+"saveWSSOForm",
       type: "POST",
       data: model,
       contentType: "application/json",
       success: function(response) {  
        if(response.success == true) {          
          intgId = response.message;
          wssoId = response.comments;
          var formStyle = response.formStyle;
          var formType = response.formType;
          if(response.records) {
            var rec = response.records;
            var reclen = rec.length;
            var prodlen = reclen-1;
            var prodsplit = response.records[prodlen].split("|");            
            $(".prodFields").find(".envId").val(prodsplit[0]); 
            $(".nonProdFields").each(function(i,v) {  
              var thisValue = $(this);
              var temp = response.records[i].split("|");
              if(temp[1] != 'prod' || temp[1] != 'PROD') {  
               thisValue.find(".envId").val(temp[0]); 
              }
            });
            $.blockUI({ 
              message: "<h3>Integration saved successfully !<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>",
            });
            var webgatedata ='This integration is for '+formStyle+'-'+formType;
            $(".webgatedata").html(webgatedata);
          }else {
            $.blockUI({ 
              message: "<h3>There is no data coming from server!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>",
            });
          }
        }else {
          $.blockUI({ 
            message: "<h3>"+response.message+"!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>",
          });
        }
       },
       error: function(xhr, status, error) {
        console.log(xhr.responseText);
        console.log(error);
         $.blockUI({ 
           message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
         }); 
       }
      }); 
    }
 });
//form save area ends
 
// form submit area  
  $(document).on('click', '.reSubmitYes', function(event) {
    submitFunction();
  });
  function submitFunction() { 
    var isValid = true;
    isValid = getValidations();
    var prodURLCheck = prodNonProdUrlCheck();
    var nonProdEnvCheck = nonProdEnvCheckFunction();
    var datepickerCheck = datepickerCheckFunction();
    var protectedNonProtectedURLCheck = protectedNonProtectedURLCheckFunction();
    if (isValid == false) {
        $( "#tabs" ).tabs( "option", "active", 0);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $.blockUI({ 
            message: "<h3>Please fill all the required fields!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else if(prodURLCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".endUserUrlP").focus();
        $.blockUI({ 
            message: "<h3>Non Prod and Prod end user URLs must not be the same.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else if(nonProdEnvCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
        $.blockUI({ 
            message: "<h3>Duplicate Non Prod Environment names found.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else if(datepickerCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 2);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
    }else if(protectedNonProtectedURLCheck == false)  {
        $( "#tabs" ).tabs( "option", "active", 1);
        $("html, body").animate({ scrollTop: 0 }, "slow");        
        $.blockUI({ 
            message: "<h3>Duplicate protected/un-protected URIs found.<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>"
        });
    }else {
      var model = getFormModel();
      $.blockUI({ 
          message: "<h3><img src='"+domainPath+"app/img/loader.gif' /> Sending data to server, this won't take much time!</h3>"
      });

      $.ajax({
         //  url: url,
        url: domainPath+"submitWSSOForm",
        type: "POST",
        data: model,
        contentType: "application/json",
        success: function(response) {
          if(response.success == true) { 
            $.blockUI({ 
                message: "<h3>Integration submitted successfully! <br><br><button type='button' class='btn btn-primary closePage'>OK</button></h3>", 
            });
          }else {
            $.blockUI({ 
              message: "<h3>"+response.message+"!<br><br><button type='button' class='btn btn-primary closeError'>OK</button></h3>",
            });
          } 
        },
        error: function(e) {
          $.blockUI({ 
              message: "<h3>It seems either session timed out or connection failed with server. Please login again.<br><br><button type='button' class='btn btn-primary closePageOnSessionError'>OK</button></h3>", 
          });
        }
     });
    }   
  }
  $(document).on('click', '#formSubmit', function(event) {
    event.preventDefault();  
    if(status && status != 'Initiated') {
      var showText = "<div><b>It seems that you are trying to resubmit the request. This will change the status to 'In Progress' and it needs to be approved again by TRO Team. Do you want to proceed?</b><hr><br>";
      showText += "<div><button type='button' class='btn btn-primary reSubmitYes'>Yes</button>  <button type='button' class='btn btn-danger reSubmitNo'>No</button></div></div>";
      $.blockUI({ 
        message: showText, 
      }); 
    }else {
      submitFunction();  
    }
  });
// form submit area ends

// close error messages
  $(document).on('click',".closePage", function(event) {
    if(window.opener) {
      window.opener.location.reload(true);
      window.close();
    }else {
      window.location.href = domainPath;
    }
  });

  
  $(document).on('click',".closePageOnSessionError", function(event) { 
    window.location.href = domainPath;    
  });
  $(document).on('click',".closeError,.rejectNo,.rejectCancel,.reSubmitNo", function(event) {
    $.unblockUI();
  });
// close error messages
}); 






