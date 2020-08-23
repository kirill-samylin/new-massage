<?php
    $connection = new MongoClient(); //подключаем MongoDB
    include('./Massage.php'); 
    if(isset($_SERVER['HTTP_LOGIN']) && !empty($_SERVER['HTTP_LOGIN']) && $_SERVER['HTTP_LOGIN'] === 'W4MpbAZCihp4DBLIKn1XTzUh') { //Псевдо защита)))
        if (isset($_POST['massage'])) {      
            $massageClass = new Massage($connection);
            $type = $massageClass->massageIsType($_POST['massage']); //Проверка на кириллицу
            $countMassage = $massageClass->massageCount($_POST['massage'], $type); //Количество сообщений
            $countSymbols = mb_strlen($_POST['massage'],'UTF-8');
            if ($countMassage && $countSymbols>0) {
                $massageClass->insertMassage($_POST['massage'], $countMassage);
                echo json_encode(array('massage' => 'Сообщение добавлено!'));
            } else {
                echo json_encode(array('massage' => 'Ошибка!'));
            }
        } else {
            echo json_encode(array('massage' => 'Ошибка!'));
        }
    } else {
        echo json_encode(array('massage' => 'Ошибка!'));
    }
?>