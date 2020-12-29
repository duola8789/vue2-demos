/**
 * Created by zh on 2020/12/29.
 */
import Vue from 'vue';

import {Button, Dialog} from 'element-ui';

[Button, Dialog].forEach((Comp) => Vue.use(Comp));
