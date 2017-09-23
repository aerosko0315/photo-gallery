jQuery(function($){

	// initialize masonry
	var $grid = $('#galleryContainer').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true,
		gutter: 10
	});

	// save masonry data into a variable
	var msnry = $grid.data('masonry');

	// initialize infinite scrolling
	$('#galleryContainer').infiniteScroll({
		path: '.pagination__next',
		append: '.grid-item',
		outlayer: msnry,
		history: false,
		scrollThreshold: 0,
		loadOnScroll: true,
		status: '.page-load-status',
		checkLastPage: '.pagination__next'
	});

	// function that check if no more images to load
	$('#galleryContainer').on( 'last.infiniteScroll', function( event, response, path ) {
	  	$('.photo-gallery').append('<h3 class="no-images">No more images to load</h3>');
	});

	// image upload initialize masonry layout
	var $thumbGrid = $('#image-holder').masonry({
		itemSelector: '.thumb-image',
		columnWidth: 150,
		gutter: 10
	});

	//reset form when modal is closed
	$('#uploadPopup').on('show.bs.modal', function(){
		$('form#upload')[0].reset();
		$("#image-holder").empty().removeAttr('style');
		$('#uploadBtn').prop('disabled', true);
		$('#progress-wrp').hide();
		$('#progress-wrp .progress-bar').removeAttr('style');
		$('#progress-wrp .status').text('0%');
		$('#output').empty();
	});

	//show input to edit title
	$('#edit-title').click(function(e){
		e.preventDefault();

		$('.title-action').hide();
		$('.form-title').show();
	});

	//cancel title edit
	$('#edit-title-cancel').click(function(e){
		e.preventDefault();

		$('.form-title').hide();
		$('.title-action').show();
	});

	//update title edit
	$('#edit-title-update').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-id'); 
		var value = $('input[name="photoTitle"]').val();
		var data = {'id': id, 'value': value};
		var $this = $(this);

		$this.prop('disabled', true);

		if($.trim(value)) {

			$.ajax({
				url: 'process.php?action=title',
				data: data,
				type: 'POST',
				success: function(data) {
					if(data) {
						$('#photo-title').text(value);
						$('.form-title').hide();
						$('.title-action').show();
					}
					else {
						alert('An error occur while updating your data, please reload and try again later.');
					}

					$this.prop('disabled', false);
				}
			});

		}
		else {
			alert('Please enter some value.');
			$this.prop('disabled', false);
		}
	});

	//adding tag to photo
	$('#add-tag').click(function(e){
		e.preventDefault();

		var id = $(this).attr('data-id');
		var value = $('input[name="tag"]').val();
		var data = {'id': id, 'value': value};
		var $this = $(this);

		$this.prop('disabled', true); 

		if($.trim(value)) {

			$.ajax({
				url: 'process.php?action=tag',
				data: data,
				type: 'POST',
				success: function(data){
					if(data) {
						$('#tags').append('<span class="single-tag">'+ value +'</span>');
						$('.form-tag')[0].reset();
					}
					else {
						alert('An error occur while updating your data, please reload and try again later.');
					}

					$this.prop('disabled', false);
				}
			});

		}
		else {
			alert('Please enter some value.');
			$this.prop('disabled', false);
		}

	});

	//gallery next navigation
	$('#slide-next, #slide-prev').click(function(e){
		e.preventDefault();

		var direction = $(this).attr('data-slide');
		var popup = $('#galleryPopup');
		var id = $(this).attr('data-id');

		var loader = $('<img src="assets/js/loader.gif" class="loader">');

		popup.find('.modal-body').append(loader);

		popup.find('#edit-title-update, #add-tag').prop('disabled', true);

		$.ajax({
			url: 'process.php?action='+ direction,
			data: {'id': id},
			type: 'POST',
			dataType: 'JSON',
			success: function(data) { 

				loader.remove();
				var img = $('<img src="assets/uploads/'+ data.photo.filename +'">');
				var title = data.photo.title;
				var tags = data.tags;
				var htmlTag = '';

				if(tags.length > 0) {
					for(var key in tags) {
						htmlTag += '<span class="single-tag">'+ tags[key].title +'</span>'
					}
				}

				popup.find('#photo-title').empty().text(title);
				popup.find('#photo-img').empty().append(img);
				popup.find('#tags').empty().append(htmlTag);
				popup.find('input[name="photoTitle"]').empty().val(title);
				popup.find('#edit-title-update, #add-tag, #slide-next, #slide-prev').attr('data-id', data.photo.id);

				popup.find('#edit-title-update, #add-tag').prop('disabled', false);

			}
		});
	});

	//callback show gallery modal with tags
	$('#galleryPopup').on('show.bs.modal', function(e){
		var photo = $(e.relatedTarget);
		var popup = $(e.currentTarget);

		popup.find('.title-action').show();
		popup.find('.form-title').hide();

		var id = photo.data('id');
		var loader = $('<img src="assets/js/loader.gif" class="loader">');

		popup.find('.modal-body').append(loader);

		//reset popup
		popup.find('#photo-title').text('');
		popup.find('#photo-img').empty();
		popup.find('#tags').empty();

		popup.find('#edit-title-update, #add-tag').prop('disabled', true);

		$.ajax({
			url: 'process.php?action=gallery',
			data: {'id': id},
			type: 'POST',
			dataType: 'JSON',
			success: function(data) {
				loader.remove();
				var img = $('<img src="assets/uploads/'+ data.photo.filename +'">');
				var title = data.photo.title;
				var tags = data.tags;
				var htmlTag = '';

				if(tags.length > 0) {
					for(var key in tags) {
						htmlTag += '<span class="single-tag">'+ tags[key].title +'</span>'
					}
				}

				popup.find('#photo-title').append(title);
				popup.find('#photo-img').append(img);
				popup.find('#tags').append(htmlTag);
				popup.find('input[name="photoTitle"]').val(title);
				popup.find('#edit-title-update, #add-tag, #slide-next, #slide-prev').attr('data-id', data.photo.id);

				popup.find('#edit-title-update, #add-tag').prop('disabled', false);
			}
		});
	});

	// preview images to upload
	$(document).ready(function() {
		$("#photoUpload").on('change', function() {
			//Get count of selected files
			var countFiles = $(this)[0].files.length;
			var imgPath = $(this)[0].value;
			var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			var image_holder = $("#image-holder");

			$('.loader').show();

			image_holder.empty();

			if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
				if (typeof(FileReader) != "undefined") {
					//loop for each file selected for uploaded.
					for (var i = 0; i < countFiles; i++) {
						var reader = new FileReader();
						
						reader.onload = function(e) {
							var $thumb = $("<img />", {
								"src": e.target.result,
								"class": "thumb-image"
							});

							image_holder.append($thumb).masonry('appended', $thumb);
						}						

						reader.readAsDataURL($(this)[0].files[i]);
					}

					setTimeout(function(){ 
						$('.loader').hide();
						image_holder.masonry('layout'); 
						image_holder.css('visibility', 'visible'); 

						$('#uploadBtn').prop('disabled', false);
					}, 1000);
				} 
				else {
					alert("This browser does not support FileReader.");
					$(this)[0].reset();
					$('.loader').hide();
					$('#uploadBtn').prop('disabled', false);
				}
			} 
			else {
				alert("Please select image files only.");
				$('#upload')[0].reset();
				$('.loader').hide();
			}
		});

		//upload button is clicked
		$(document).on('submit', 'form#upload', function(event){
			event.preventDefault();

			var files = new FormData(this);
			var post_url = $(this).attr('action');
			var submit_btn = $(this).find('input[type="submit"]');

			$('#progress-wrp').show();

			//ajax perform upload to watch progress
			$.ajax({
			    url : post_url,
			    type: "POST",
			    data : files,
			    contentType: false,
			    cache: false,
			    processData:false,
			    xhr: function(){
			        //upload Progress
			        var xhr = $.ajaxSettings.xhr();
			        if (xhr.upload) {
			            xhr.upload.addEventListener('progress', function(event) {
			                var percent = 0;
			                var position = event.loaded || event.position;
			                var total = event.total;
			                if (event.lengthComputable) {
			                    percent = Math.ceil(position / total * 100);
			                }
			                //update progressbar
			                $("#progress-wrp .progress-bar").css("width", + percent +"%");
			                $("#progress-wrp .status").text(percent +"%");
			            }, true);
			        }
			        return xhr;
			    },
			    mimeType:"multipart/form-data"
			}).done(function(data){ 
				if(data == true) {
			    	$('#output').html('<p class="text-success">All Images has been successfully uploaded.</p>');
			    	submit_btn.val("Upload").prop( "disabled", true);
				}
			    else {
			    	$('#output').html('<p class="text-danger">'+ data +'</p>');
			    }
			    
			});
		});
	});

});
