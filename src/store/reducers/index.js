import { combineReducers } from 'redux';
import locationReducers from './location';
import authReducers from './auth';
import pasienReducers from './pasien';
import adminReducers from './admin';
import predictReducers from './predict';
import penilaianReducers from './penilaian'

export default combineReducers({
	locationReducers,
	authReducers,
	pasienReducers,
	adminReducers,
	predictReducers,
	penilaianReducers
});
