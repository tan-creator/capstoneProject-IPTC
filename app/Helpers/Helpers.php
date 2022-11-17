<?php
namespace App\Helpers;

class Helpers {
    /*
    * Encode array from latin1 to utf8 recursively
     * @param $dat
     * @return array|string
     */
    public static function convertFromLatin1ToUtf8Recursively($dat)
    {
        if (is_string($dat)) {
            return utf8_encode($dat);
        } elseif (is_array($dat)) {
            $ret = [];
            foreach ($dat as $i => $d) $ret[ $i ] = self::convertFromLatin1ToUtf8Recursively($d);

            return $ret;
        } elseif (is_object($dat)) {
            foreach ($dat as $i => $d) $dat->$i = self::convertFromLatin1ToUtf8Recursively($d);

            return $dat;
        } else {
            return $dat;
        }
    }
}