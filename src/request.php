<?php

$date =  $_POST['date'];

if (isset($_POST['date'])) {
    return $date .= 'Success';
} else {
    return 'Error: Данные отсутствуют';
}