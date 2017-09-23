<?php

include('autoloader.php');


if($_GET['action'] == 'upload') {
	$upload = $photoGallery->upload($_FILES['photo']);

	echo $upload;
}
if($_GET['action'] == 'gallery') {
	$data = $photoGallery->singlePhoto($_POST['id']);

	echo json_encode($data);
}
if($_GET['action'] == 'title') {
	$data = $photoGallery->updateTitle($_POST['id'], $_POST['value']);

	echo $data;
}
if($_GET['action'] == 'tag') {
	$data = $photoGallery->addTag($_POST['id'], $_POST['value']);

	echo $data;
}
if($_GET['action'] == 'next') {
	$data = $photoGallery->nextSlide($_POST['id']);

	echo json_encode($data);
}
if($_GET['action'] == 'prev') {
	$data = $photoGallery->prevSlide($_POST['id']);

	echo json_encode($data);
}