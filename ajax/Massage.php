<?php
class Massage {
    protected $connection = null;
    
    public function __construct($connection = null) {
        if (!$connection) {
            $this->connection = new MongoClient();
        } else {
            $this->connection = $connection;
        }
    }

    public function massageIsType($msg) {
        $arr = str_split($msg);
        $pattern = '/^[а-яё«»–—№`]+$/i';
		foreach ($arr as $key => $symbol) {
            if (preg_match($pattern, $symbol)) {
                return false;
            }   
        }
		return true;
    }

    public function massageCount($str, $type) {
        $countSymbol = mb_strlen($str,'UTF-8');
        $limit = ($type) ? (($countSymbol<=160) ? 160 : 153) : (($countSymbol<=70) ? 70 : 67);
        $countMassage = ceil($countSymbol / $limit);
        return $countMassage;
    }

    public function insertMassage($massage, $count) {
        $this->connection->selectDB('admin')->selectCollection('massages')->insert(array('massage' => $massage, 'count' => $count));
    }
}

?>