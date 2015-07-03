<?php
//2007-2015,plernsoft 
class NxEnv
{
	public $_type;//type
	public $_name;//name
	public $_code;//code
	public $_value;//value
	function NxEnv($envType,$name,$envCode,$var)
	{
			$this->_type=$envType;
			$this->_name=$name;
			$this->_code=$envCode;
			$this->_value=$var;
	} 
}    
//=========================================================
class NxJson
{ 
	function encode($var)
      {
	 
        switch (gettype($var)) {
            case 'boolean':
                return $var ? 'true' : 'false';
            case 'NULL':
                return 'null';
            case 'integer':
                return (int) $var;
            case 'double':
            case 'float':
                return (float) $var;
            case 'string':
                return '"'.$var.'"';
            case 'array':        
                if (is_array($var) && count($var) && (array_keys($var) !== range(0, sizeof($var) - 1))) {
                    $properties = array_map(array($this, 'name_value'),
                                            array_keys($var),
                                            array_values($var));
			 
                    return '{' . join(',', $properties) . '}';
                }

                // treat it like a regular array
                $elements = array_map(array($this, 'encode'), $var);
			 
                return '[' . join(',', $elements) . ']';

            case 'object':
                $vars = get_object_vars($var); 
                $properties = array_map(array($this, 'name_value'),
                                        array_keys($vars),
                                        array_values($vars)); 
                return '{' . join(',', $properties) . '}';
            default:
                 return '{"status":"Encode_Err"}';			  
        }
    }
    function name_value($name, $value)
    {
        $encoded_value = $this->encode($value);
		/*
        if(Services_JSON::isError($encoded_value)) {
            return $encoded_value;
        }*/

        return $this->encode(strval($name)) . ':' . $encoded_value;
    }
	//-----------------
	static function PrintNewEnv($type,$name,$code,$var)
	{ 
			$nxj=new NxJson();
			$env=new NxEnv($type,$name,$code,$var);
		       echo $nxj->encode($env);	
	}
	static function PrintEnv($code,$var)
	{
		      $nxj=new NxJson();
		      $env=new NxEnv(gettype($var),get_class($var),$code,$var);
			echo $nxj->encode($env);
	} 
	static function PrintJson($var)
	{
			$nxj=new NxJson();
			echo $nxj->encode($var);
	} 
	static function Ex($var)
	{		$nxj=new NxJson();
			return $nxj->encode($var);
	}
} 
class NxRS
{	//result set contains many table
	 public $tables=array();
	 function Add($nxtbl)
	 {
		array_push($this->tables,$nxtbl);
	 } 
	 
}
class NxTable
{ 
	    public $cols=array();
		public $rows=array();
		private $orders=array();
		private $fieldCount=0;
		function NxTable($fldinfo)
		{
					$i=0;
					if($fldinfo != null)
					{
						foreach($fldinfo as $val)
						{						 
							$this->cols[$val->name]=$val->type;
							$this->orders[$val->name]=$i;
							$i++;
						}				  
					}				
					$this->fieldCount=$i;
		}
		function getRowCount()
		{
			if($this->rows != null)
			{
				return count($this->rows);
			}
			else
			{
				return -1;
			}
		}
		function F($fldName)		//field order
		{		
				return $this->orders[$fldName];
		}
		function V($rowid,$fld)
		{
				switch(gettype($fld))
				{
					case "string"://field name
					{		 
							  $fo= $this->orders[$fld];
							 // print_r($this->orders);
							  if($fo != null)
							  {
									$row=$this->rows[$rowid];
									return $row[$fo];
							  }
					} 
					case "integer":
					{		$row=$this->rows[$rowid];
							return $row[$fld];
					} 	 
				}
				return null;
		}
		function CreateAssocArray($rowid,$jmps)
		{
			   //convert simple array to assoc array
			   if($jmps==null)//no mapping found
			   {
					$myarr=array();
					$c_names=array_keys($this->cols);
					$row=$this->rows[$rowid];
					$i=0;
					foreach($c_names as $name)
					{
						$myarr[$name]=$row[$i];
						$i++;
					}		  
					return $myarr;
			  }
			  else  if($jmps["m"] != null)
			  {
						$myarr=array();
						$maps=$jmps["m"];
						$pairs=explode(",",$maps);
						$j=count($pairs);
						$row=$this->rows[$rowid];
						 
						for($i=0;$i<$j;$i++)
						{
							   $kms=explode("-",$pairs[$i]);
							     
								$fo=$this->orders[$kms[1]];		
								
								if($fo != null)
								{
										$myarr[$kms[0]]=$row[$fo];
								}
								else								
								{
										$myarr[$kms[0]]=null;
								}
						}
						
						return $myarr;
			  }
			  else
			  {
				     return null;
			  }
			  
		}
		function CreateObject($rowid,$jmps)
		{			 
			 //jmps= jmpObject
			 $class_name=$jmps["c"];//class name
			 $row=$this->rows[$rowid]; // 
			  if($class_name != null)
			  {
					$obj = new $class_name;//create predefined object			   				
					$maps=$jmps["m"];//map //parse map
					$pairs=explode(",",$maps);
				 
					$j=count($pairs);
					for($i=0;$i<$j;$i++)
					{	
						     //parse key map
							 $kms=explode("-",$pairs[$i]);	
							 $prop_n=$kms[0];
							$fo=$this->orders[$kms[1]];
							 if($fo != null)
							 {
									$obj->$prop_n=$row[$fo];
							 }	 
					}
				 
					return $obj;
			  }
			  return null;			 
		}
		static function  CreateJmp($class_name,$jmp)
		{	
				return array("c"=>$class_name,"m"=>$jmp);
		}	 
	
} 
?>