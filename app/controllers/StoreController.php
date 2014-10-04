<?php
/*
    an api shit
*/
class StoreController extends BaseController 
{
    // Pretty fine with this method
    public function create()
    {
        $img = null;
        $tmp_img = Input::file('menu');
        $tmp_img ? $img = $tmp_img->move('imgs', str_random(12)) : false;

        $s = new Store;
        $s->name = Input::get('name');
        $s->tel = Input::get('tel');
        $s->menu = $img ? $img : null;
        $s->mime = $img ? $img->getMimeType() : null;
        $s->memo = Input::get('memo');
        $result = $s->save();

        if (!$result) {
            $img ? unlink($img) : false;

            return $s->errors()->all();
        }

        $s->result = true;

        return $s;
    }

    public function edit()
    {
        $img = null;
        $tmp_img = Input::file('menu');

        $s = Store::find(Input::get('sid'));
        $s->name = Input::get('name');
        $s->tel = Input::get('tel');

        if ($tmp_img) {
            $old_img = $s->menu;
            $old_img ? unlink($old_img) : false;

            $img = $tmp_img->move('imgs', str_random(12));
            $s->menu = $img;
            $s->mime = $img->getMimeType();
        } else {
            // Tricky here, mock it like uploadfile to trick validtion
            $tmp = new Symfony\Component\HttpFoundation\File\File($s->menu);
            $s->menu = $tmp;
        }

        $s->memo = Input::get('memo');
        $result = $s->save();

        if ($result) {
            $s->result = true;

            return $s;
        } else {
            return $s->errors()->all();
        }
    }

    // Do the job, but not perfect
    public function delete()
    {
        $s = Store::find(Input::get('sid'));

        if ($s) {
            $old_img = $s->menu;
            $old_img ? unlink($old_img) : false;

            $s->delete();
        }

        if (Store::find(Input::get('sid'))) {
            return Response::json(array('result' => false));
        }

        return Response::json(array('result' => true));
    }

    public function getMenu($id)
    {
        $img = Store::find($id);
        $path = $img->menu;
        $mime = $img->mime;

        header("Content-Type: $mime");
        readfile($path);
        exit();
    }
}
