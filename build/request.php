<?php

$date =  $_GET['date'];

if (isset($date)) {
    return $date .= 'Success';
} else {
    return 'Error: Данные отсутствуют';
}