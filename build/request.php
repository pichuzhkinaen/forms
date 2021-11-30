<?php

// $formData = $_GET['formData'];

// print_r('OK');

$formData = $_POST['formData'];
if ($formData !== []) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $option1 = $_POST['option-1'];
    $option2 = $_POST['option-2'];
    $option3 = $_POST['option-1'];
    $radio = $_POST['radio'];
    $select = $_POST['select'];
    $file = $_FILES['file']['name'];
    
    print_r("$name | $email | $phone | $option1 | $option2 | $option3 | $radio | $select | $file");
} else {
    print_r('error');
}
