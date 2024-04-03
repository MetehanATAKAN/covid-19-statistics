import { call, put, takeLatest } from 'redux-saga/effects';
import { requestData, dataSuccess, dataFailure } from './actions';
import axios from 'axios';

const covidApi = async (query) => {
    const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${query}`);
    return response;
}
function* fetchData(query) {
    try {
        const response = yield call(covidApi, query.payload);
        
        if (response.status === 200) {
            yield put(dataSuccess(response.data));
        } else if (response.status === 404) {
            yield put(dataFailure());
        }
    } catch (error) {
        yield put(dataFailure());
    }
}

export function* watchFetchData() {
    yield takeLatest(requestData().type, fetchData);
}
