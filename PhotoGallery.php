<?php

class PhotoGallery {

	public $db;
	public $mysqli;

	public function __construct() {
		$this->db 	= Database::getInstance(); //DB object instance
		$this->mysqli = $this->db->getConnection(); //DB connection
	}

	/**
	 * Execute uploading images
	 * @return bool or string
	 */
	public function upload($files) {
		$output = true;
		$error = '';

		$extn = array('jpeg', 'jpg', 'png', 'gif');

		foreach ($files['tmp_name'] as $key => $value) {
			$dir = 'assets/uploads/';

			$filename = $files['name'][$key];
			$tempfile = $files['tmp_name'][$key];
			$ext = pathinfo($filename, PATHINFO_EXTENSION);

			$photoFile = $filename;

			$image_details = getimagesize($files['tmp_name'][$key]);
			$width = $image_details[0];
			$height = $image_details[1];
			$size = $files['size'][$key];

			if(in_array($ext, $extn)) {
				if(!file_exists($dir . $filename)) {
					move_uploaded_file($files['tmp_name'][$key], $dir . $filename);
				}
				else {
					$filename = basename($filename, $ext);
					$newfilename = $filename . round(microtime(true)) . '.' . $ext;
					$photoFile = $newfilename;
					move_uploaded_file($files['tmp_name'][$key], $dir . $newfilename);
				}

				$title = explode('.', $photoFile)[0];
				$insert = "INSERT INTO photos (title, filename, filesize, height, width) VALUES ('{$title}', '{$photoFile}', '{$size}', '{$height}', '{$width}')";

				if( $this->mysqli->query($insert) ) {
					$output = true;
				}
				else {
					$output = 'Failed to add image with the following errors: '. $this->mysqli->error;
				}
			}
			else {
				$error .= 'Failed to upload: '. $filename .'<br/>';
			}			
		}

		if($error != '') {
			$output = $error;
		}

		return $output;
	}

	/**
	 * Fetch the photos from the database
	 * @return Object
	 */
	public function photos($offset, $limit) {
		$sql = "SELECT * FROM photos ORDER BY id LIMIT {$offset}, {$limit}";

		$data = array();
		$results = $this->mysqli->query($sql);

		while($obj = $results->fetch_object()) {
			$data[] = $obj;
		}

		return (object) $data;
	}

	/**
	 * render iterated photos
	 * @return Tpl
	 */
	public function list($page) {
		$next = $page + 1;
		$count = 0;
		$counter = 0;
		$limit = 10;
		$offset = ($page - 1) * $limit;
		$dir = 'assets/uploads/';

		$output = '';

		foreach($this->photos($offset, $limit) as $photo) {
			$output .= '<div class="grid-item"><a class="gallery-photo" href="#galleryPopup" data-id="'. $photo->id .'" data-toggle="modal"><img src="'. $dir . $photo->filename .'"></a></div>'; 
		}

		return $output;
	}

	/**
	 * render next url
	 * @return Tpl
	 */
	public function next($page) {
		$next = $page + 1;
		$output = '';
		$maxPage = sizeof((array)$this->photos(0, PHP_INT_MAX)) / 10;

		if($page <= $maxPage) {
			$output = '<a class="pagination__next" href="?page='. $next .'">Next</a>';
		}

		return $output;
	}

	/**
	 * fetch data of a single image
	 * @return array()
	 */
	public function singlePhoto($id) {
		$photo = array();
		$tags = array();

		$sqlPhoto = "SELECT * FROM photos WHERE id='{$id}' LIMIT 1";
		$photoResults = $this->mysqli->query($sqlPhoto);
		$photo = $photoResults->fetch_assoc();

		$sqlTags = "SELECT * FROM tags WHERE photo_id='{$id}'";
		$tagsResults = $this->mysqli->query($sqlTags);

		while($row = $tagsResults->fetch_assoc()) {
			$tags[] = $row;
		}

		$output = array('photo'=> $photo, 'tags'=> $tags);

		return $output;
	}

	/**
	 * update title of the photo
	 * @return Boolean
	 */
	public function updateTitle($id, $title) {
		$sql = "UPDATE photos SET title='{$title}' WHERE id='{$id}'";
		$output = $this->mysqli->query($sql);

		return $output;
	}

	/**
	 * Insert a tag to a photo
	 * @return Boolean
	 */
	public function addTag($id, $tag) {
		$sql = "INSERT INTO tags (title, photo_id) VALUES ('{$tag}', '{$id}')";
		$output = $this->mysqli->query($sql);

		return $output;
	}

	/**
	 * Fetch next photo data
	 * @return Object
	 */
	public function nextSlide($id) {
		$photo = array();
		$tags = array();

		$sqlPhoto = "SELECT * FROM photos WHERE id = (SELECT min(id) FROM photos WHERE id > {$id}) LIMIT 1";
		$photoResults = $this->mysqli->query($sqlPhoto);
		$photo = $photoResults->fetch_assoc();

		if(empty($photo)) {
			$sqlPhoto = "SELECT * FROM photos ORDER BY id DESC LIMIT 1";
			$photoResults = $this->mysqli->query($sqlPhoto);
			$photo = $photoResults->fetch_assoc();
		}

		$newID = $photo['id'];

		$sqlTags = "SELECT * FROM tags WHERE photo_id='{$newID}'";
		$tagsResults = $this->mysqli->query($sqlTags);

		while($row = $tagsResults->fetch_assoc()) {
			$tags[] = $row;
		}

		$output = array('photo'=> $photo, 'tags'=> $tags);

		return $output;
	}

	/**
	 * Fetch previous photo data
	 * @return Object
	 */
	public function prevSlide($id) {
		$photo = array();
		$tags = array();

		$sqlPhoto = "SELECT * FROM photos WHERE id = (SELECT max(id) FROM photos WHERE id < {$id}) LIMIT 1";
		$photoResults = $this->mysqli->query($sqlPhoto);
		$photo = $photoResults->fetch_assoc(); 	

		if(empty($photo)) {
			$sqlPhoto = "SELECT * FROM photos ORDER BY id ASC LIMIT 1";
			$photoResults = $this->mysqli->query($sqlPhoto);
			$photo = $photoResults->fetch_assoc();
		}

		$newID = $photo['id'];

		$sqlTags = "SELECT * FROM tags WHERE photo_id='{$newID}'";
		$tagsResults = $this->mysqli->query($sqlTags);

		while($row = $tagsResults->fetch_assoc()) {
			$tags[] = $row;
		}

		$output = array('photo'=> $photo, 'tags'=> $tags);

		return $output;	
	}

}